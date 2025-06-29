package com.example.driveservice.fs;

import com.example.driveservice.dao.mongo.DriveRepository;
import com.example.driveservice.dao.redis.VfsCacheRepository;
import com.example.driveservice.document.Directory;
import com.example.driveservice.document.File;
import com.example.driveservice.document.Node;
import com.example.driveservice.exception.IllegalUsernameException;
import com.example.driveservice.service.UploadService;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class InMemoryFileSystem implements VirtualFileSystem {

  // VFS 메타 데이터
  @Getter
  @Setter
  @JsonProperty("username")
  private String username;

  @Getter
  @Setter
  @JsonProperty("subscription")
  private String subscription;

  @Getter
  @Setter
  @JsonProperty("currentSize")
  private long currentSize;

  @Getter
  @Setter
  @JsonProperty("maxSize")
  private long maxSize;

  // 의존성
  @JsonIgnore
  @Getter
  @Setter
  private DriveRepository driveRepo;

  @JsonIgnore
  @Getter
  @Setter
  private VfsCacheRepository cacheRepo;

  @JsonIgnore
  @Getter
  @Setter
  private UploadService uploadService;

  // VFS 속성
  @JsonIgnore
  private Directory root;

  @JsonIgnore
  private Directory pwd;

  @JsonIgnore
  private final List<Node> deleteQueue = new ArrayList<>();

  @JsonIgnore
  private final Map<Node, InputStream> uploadQueue = new HashMap<>();


  public InMemoryFileSystem() {
    // Empty Constructor for deserialization using ObjectMapper
  }

  //TODO Deprecate this constructor and make users use Factory class
  public InMemoryFileSystem(List<Node> nodes, DriveRepository repo) {
    buildTree(nodes);
    this.driveRepo = repo;
  }

  protected InMemoryFileSystem(Directory root, String username, String subscription,
      long currentSize, long maxSize,
      DriveRepository driveRepo, VfsCacheRepository cacheRepo, UploadService uploadService) {
    this.root = root;
    this.pwd = root;
    this.username = username;
    this.subscription = subscription;
    this.currentSize = currentSize;
    this.maxSize = maxSize;
    this.driveRepo = driveRepo;
    this.cacheRepo = cacheRepo;
    this.uploadService = uploadService;
  }

  /**
   * Node 리스트를 N-ary 다진 트리로 변환
   *
   * @param nodes Mongo DB 조회 결과로서 반환된 Node들
   */
  private void buildTree(List<Node> nodes) {
    Map<String, Directory> dirMap = new HashMap<>();
    Map<String, Node> nodesMap = new HashMap<>();

    for (Node node : nodes) {
      nodesMap.put(node.getNodeId(), node);
      if (node instanceof Directory dir) {
        dirMap.put(dir.getNodeId(), dir);
      }
    }

    for (Node node : nodes) {
      if (node.getParentId() == null) {
        root = (Directory) node;
        pwd = (Directory) node;
        continue;
      }

      Directory parent = dirMap.get(node.getParentId());
      if (parent != null) {
        parent.getChildren().add(node);
      }
    }
  }

  private Directory findDirRecursively(String nodeId, Node currentNode) {
    if (!(currentNode instanceof Directory dir)) { // currentNode가 File인 경우
      return null;
    }

    if (currentNode.getNodeId().equals(nodeId)) {// 한 번에 찾은 경우
      return dir;
    }

    for (Node child : dir.getChildren()) {
      Directory found = findDirRecursively(nodeId, child);
      if (found != null) {
        return found;
      }
    }
    return null;
  }

  private void updateDepthRecursively(Node node, int newDepth) {
    node.setDepth(newDepth);
    node.markDirty();
    if (node instanceof Directory dir) {
      List<Node> children = dir.getChildren();
      for (Node child : children) {
        updateDepthRecursively(child, newDepth + 1);
      }
    }
  }

  private void updatePathRecursively(Node node, Directory newParent) {
    String newPath = newParent.getPath() + "/" + node.getFilename();
    node.setPath(newPath);
    node.markDirty();
    if (node instanceof Directory dir) {
      List<Node> children = dir.getChildren();
      for (Node child : children) {
        updatePathRecursively(child, dir);
      }
    }
  }

  private boolean findDuplication(Directory from, Node src) {
    List<Node> children = from.getChildren();

    for (Node child : children) {
      if (child.getFilename().equalsIgnoreCase(src.getFilename()) && src.isDir() == child.isDir()) {
        return true;
      }
    }
    return false;
  }

  /**
   * 재귀 함수. <br> root에서 시작하여 트리의 모든 노드를 순회. 대상 노드의 dirty flag를 기준으로 MongoDB에의 저장을 결정. 대상 노드가 저장되면
   * dirty flag는 false로 바뀜(clean).
   *
   * @param node dirty flag 검사 및 DB 저장의 대상이 되는 노드
   */
  private void flushRecursively(Node node) {
    if (node.isDirty()) {
      log.info("변경된 {}(을)를 저장 중...", node.getNodeId());
      driveRepo.save(node);
      node.clean();
    }

    if (node instanceof Directory dir) {
      for (Node child : dir.getChildren()) {
        flushRecursively(child);
      }
    }
  }

  @Override
  public Directory root() {
    return this.root;
  }

  @Override
  public Directory pwd() {
    return this.pwd;
  }


  @Override
  public void touch(File newFile, InputStream fileStream) throws IllegalArgumentException {
    String parentId = newFile.getParentId();
    Directory parent = findDirRecursively(parentId, root); // root 디렉터리에서부터 검색
    if (parent == null) {
      throw new IllegalArgumentException("parentId = " + parentId + "에 해당하는 부모 노드를 찾을 수 없습니다");
    }
    uploadQueue.put(newFile, fileStream);
    parent.getChildren().add(newFile);
    newFile.markDirty();
  }

  @Override
  public void mkdir(Directory newDir) throws IllegalArgumentException {
    String parentId = newDir.getParentId();
    Directory parent = findDirRecursively(parentId, root); // root 디렉터리에서부터 검색
    if (parent == null) {
      throw new IllegalArgumentException("parentId = " + parentId + "에 해당하는 부모 노드를 찾을 수 없습니다");
    }
    parent.getChildren().add(newDir);
    newDir.markDirty();
  }

  @Override
  public void mv(Node target, Directory newParent)
      throws IllegalArgumentException, NoSuchElementException {
    Directory oldParent = findDirRecursively(target.getParentId(), root);

    if (oldParent == null || newParent == null) {
      throw new IllegalArgumentException("부모 노드를 찾을 수 없습니다");
    }

    // 본래 디렉터리에서 타깃 노드를 제거
    Iterator<Node> srcIter = oldParent.getChildren().iterator();
    Node movingNode = null;
    while (srcIter.hasNext()) {
      Node child = srcIter.next();
      if (child.getNodeId().equals(target.getNodeId())) {
        movingNode = child;
        srcIter.remove();
        break;
      }
    }

    if (movingNode == null) { // srcDir에서 옮기고자 하는 파일을 찾을 수 없는 경우
      String message = String.format("%s에서 %s(을)를 찾을 수 없습니다.", target.getPath(),
          target.getFilename());
      throw new NoSuchElementException(message);
    }

    // depth, parentId, path 재계산
    updateDepthRecursively(movingNode, newParent.getDepth() + 1);

    movingNode.setParentId(newParent.getNodeId());
    updatePathRecursively(movingNode, newParent);

    // 목적지 디렉터리에 삽입 전, duplication 검증
    List<Node> destDirChildren = newParent.getChildren();
    boolean isDuplicated = findDuplication(newParent, movingNode);

    if (isDuplicated) { // 중복되는 이름의 파일이 이미 newParent에 존재하는 경우
      String message = String.format("%s에 같은 이름의 파일이 존재합니다.", newParent.getFilename());
      throw new IllegalArgumentException(message);
    }

    // 목적지 디렉터리에 삽입
    newParent.getChildren().add(movingNode);
  }

  @Override
  public void rm(Node target) throws IllegalArgumentException {
    String parentId = target.getParentId();
    Directory parent = findDirRecursively(parentId, root);
    if (parent == null) {
      throw new IllegalArgumentException("parentId = " + parentId + "에 해당하는 부모 노드를 찾을 수 없습니다");
    }

    Iterator<Node> iterator = parent.getChildren().iterator();
    while (iterator.hasNext()) {
      Node child = iterator.next();
      if (child.getNodeId().equals(target.getNodeId())) {
        iterator.remove();
        deleteQueue.add(child);
      }
    }
  }

  @Override
  public Directory cd(Node target) throws IllegalUsernameException {
    pwd = findDirRecursively(target.getNodeId(), root);
    return pwd;
  }

  @Override
  public List<Node> ls() {
    return pwd.getChildren();
  }

  /**
   * 다진 트리의 변경된 Node를 MongoDB에 적용하는 메서드
   */
  @Override
  public void flush() {
    log.info("flush 호출이 감지되었습니다. 변경 노드를 동기화합니다.");

    log.info("Delete Queue에 따라 노드 삭제 중...");
    for (Node node : deleteQueue) {
      log.info("[노드 삭제]DB에서 {} 노드를 삭제합니다", node.getNodeId());
      driveRepo.delete(node);
    }

    log.info("변경된 노드 수집 중...");
    flushRecursively(root);

    log.info("변경된 노드 동기화 중...");

    deleteQueue.clear();
  }
}