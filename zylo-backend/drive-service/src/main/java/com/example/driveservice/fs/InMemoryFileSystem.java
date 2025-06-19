package com.example.driveservice.fs;

import com.example.driveservice.dao.DriveRepository;
import com.example.driveservice.document.Directory;
import com.example.driveservice.document.Node;
import com.example.driveservice.exception.IllegalUsernameException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class InMemoryFileSystem implements VirtualFileSystem {

  private Directory root;
  private Directory pwd;
  private final DriveRepository repo;
  private final List<Node> deleteQueue = new ArrayList<>();

  public InMemoryFileSystem(List<Node> nodes, DriveRepository repo) {
    buildTree(nodes);
    this.repo = repo;
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

  @Override
  public Directory root() {
    return this.root;
  }

  @Override
  public Directory pwd() {
    return this.pwd;
  }

  @Override
  public void create(Node newNode) throws IllegalArgumentException {
    String parentId = newNode.getParentId();
    Directory parent = findDirRecursively(parentId, root); // root 디렉터리에서부터 검색
    if (parent == null) {
      throw new IllegalArgumentException("parentId = " + parentId + "에 해당하는 부모 노드를 찾을 수 없습니다");
    }
    parent.getChildren().add(newNode);
    newNode.markDirty();
  }

  @Override
  public Directory mv(Node src, Node dest) throws IllegalArgumentException {
    Directory srcDir = findDirRecursively(src.getParentId(), root);
    Directory destDir = findDirRecursively(dest.getParentId(), root);

    if (srcDir == null || destDir == null) {
      throw new IllegalArgumentException("부모 노드를 찾을 수 없습니다");
    }

    Iterator<Node> srcIter = srcDir.getChildren().iterator();
    while (srcIter.hasNext()) {
      Node child = srcIter.next();
      srcIter.remove();
      //TODO: Current working position
    }

    return null;
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
    log.info("flush 호출이 감지되었습니다. 변경 지점 동기화를 시작합니다.");
    flushRecursively(root);

    log.info("Delete Queue로부터 노드 삭제 중...");
    for (Node node : deleteQueue) {
      log.info("{} 노드를 삭제합니다", node.getNodeId());
      repo.delete(node);
    }

    deleteQueue.clear();
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
      repo.save(node);
      node.clean();
    }

    if (node instanceof Directory dir) {
      for (Node child : dir.getChildren()) {
        flushRecursively(child);
      }
    }
  }
}
