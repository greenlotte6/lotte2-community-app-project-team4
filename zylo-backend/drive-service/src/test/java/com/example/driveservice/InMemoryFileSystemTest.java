package com.example.driveservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.driveservice.dao.mong.DriveRepository;
import com.example.driveservice.document.Directory;
import com.example.driveservice.document.File;
import com.example.driveservice.document.Node;
import com.example.driveservice.fs.InMemoryFileSystem;
import com.example.driveservice.fs.VirtualFileSystem;
import com.example.driveservice.fs.VirtualFileSystemSerializer;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class InMemoryFileSystemTest {

  private VirtualFileSystem vfs;

  @Autowired
  private DriveRepository repo;

  @Autowired
  private VirtualFileSystemSerializer serializer;

  private static final String FAKE_USER_ID = "abc123";
  private static final String ROOT_NODE_ID = FAKE_USER_ID + UUID.randomUUID();
  private static final String EMPTY_DIR_ID = FAKE_USER_ID + UUID.randomUUID();

  private static final String SUB_DIR_NODE_ID = FAKE_USER_ID + UUID.randomUUID();

  @BeforeEach
  void buildVfs() {
    Directory root = Directory.builder() // depth = 0, isDir = true
        .nodeId(ROOT_NODE_ID)
        .owner(FAKE_USER_ID)
        .filename(FAKE_USER_ID)
        .isDir(true)
        .depth(0)
        .parentId(null)
        .path("/drive/" + FAKE_USER_ID)
        .lastModified(LocalDateTime.now())
        .dirty(false)
        .children(new ArrayList<>())
        .build();

    Directory emptyDir = Directory.builder() // depth = 1, isDir = true
        .nodeId(EMPTY_DIR_ID)
        .owner(FAKE_USER_ID)
        .filename("empty_directory")
        .isDir(true)
        .depth(1)
        .parentId(ROOT_NODE_ID)
        .path("/drive/" + FAKE_USER_ID + "/empty_directory")
        .lastModified(LocalDateTime.now())
        .dirty(false)
        .children(new ArrayList<>())
        .build();

    Directory subDir = Directory.builder()
        .nodeId(SUB_DIR_NODE_ID)
        .owner(FAKE_USER_ID)
        .filename("sub_directory")
        .isDir(true)
        .depth(1)
        .parentId(ROOT_NODE_ID)
        .path("/drive/" + FAKE_USER_ID + "/sub_directory")
        .lastModified(LocalDateTime.now())
        .dirty(false)
        .children(new ArrayList<>())
        .build(); // depth = 1, isDir = true

    File imageFile = File.builder() // depth = 2, isDir = false, mimeType = image
        .nodeId(FAKE_USER_ID + UUID.randomUUID())
        .owner(FAKE_USER_ID)
        .filename("wallpaper.jpg")
        .isDir(true)
        .depth(2)
        .parentId(SUB_DIR_NODE_ID)
        .path("/drive/" + FAKE_USER_ID + "/sub_directory" + "/wallpaper.jpg")
        .lastModified(LocalDateTime.now())
        .dirty(false)
        .size(1024)
        .mimeType("image/jpeg")
        .build();

    File textFile = File.builder()
        .nodeId(FAKE_USER_ID + UUID.randomUUID())
        .owner(FAKE_USER_ID)
        .filename("helloWorld.txt")
        .isDir(true)
        .depth(2)
        .parentId(SUB_DIR_NODE_ID)
        .path("/drive/" + FAKE_USER_ID + "/sub_directory" + "/helloWorld.txt")
        .lastModified(LocalDateTime.now())
        .dirty(false)
        .size(11)
        .mimeType("text/plain")
        .build(); // depth = 2 , isDir = false ,mimeType = text

    List<Node> nodes = new ArrayList<>();

    nodes.add(root);
    nodes.add(emptyDir);
    nodes.add(subDir);
    nodes.add(imageFile);
    nodes.add(textFile);

    this.vfs = new InMemoryFileSystem(nodes, repo);

  }

  @Test
  void test_vfsSerializer_success() throws JsonProcessingException {
    String json = serializer.serialize(vfs);

    assertNotEquals("", json);
  }

  @Test
  void test_get_root_success() {
    Directory root = vfs.root();

    assertEquals(0, root.getDepth());
    assertEquals("/drive/" + FAKE_USER_ID, root.getPath());
    assertEquals(FAKE_USER_ID, root.getFilename());
    assertTrue(root.isDir());
  }

  @Test
  void test_ls_success() {
    List<Node> children = vfs.ls();
    assertEquals(2, children.size());

    for (Node child : children) {
      String filename = child.getFilename();
      boolean isMatch = filename.equals("empty_directory") || filename.equals("sub_directory");
      assertTrue(child.isDir());
      assertTrue(isMatch);
      assertEquals(1, child.getDepth());
    }
  }

  @Test
  void test_cd_to_emptyDir_and_ls_success() {
    List<Node> childrenOfRoot = vfs.ls();
    Directory emptyDir = null;
    for (Node child : childrenOfRoot) {
      if (child.getNodeId().equals(EMPTY_DIR_ID)) {
        emptyDir = (Directory) child;
        break;
      }
    }

    vfs.cd(emptyDir);

    List<Node> childrenOfEmptyDir = vfs.ls();
    assertEquals(0, childrenOfEmptyDir.size());

    Directory subDir = null;
    for (Node child : childrenOfRoot) {
      if (child.getNodeId().equals(SUB_DIR_NODE_ID)) {
        subDir = (Directory) child;
        break;
      }
    }
    vfs.cd(subDir);
    List<Node> childrenOfSubDir = vfs.ls();
    assertEquals(2, childrenOfSubDir.size());

    Directory pwd = vfs.pwd();
    assertEquals(SUB_DIR_NODE_ID, pwd.getNodeId());
  }

  @Test
  void test_create_and_rm_success() {
    Directory pwd = vfs.pwd();

    assertEquals(ROOT_NODE_ID, pwd.getNodeId());

    String nodeId = FAKE_USER_ID + UUID.randomUUID();
    File createdFile = File.builder()
        .nodeId(nodeId)
        .owner(FAKE_USER_ID)
        .filename("createdByVFS.txt")
        .isDir(true)
        .depth(1)
        .parentId(ROOT_NODE_ID)
        .path("/drive/" + FAKE_USER_ID + "/sub_directory" + "/createdByVFS.txt")
        .lastModified(LocalDateTime.now())
        .dirty(false)
        .size(11)
        .mimeType("text/plain")
        .build(); // depth = 2 , isDir = false ,mimeType = text

    vfs.create(createdFile);

    List<Node> childrenOfRoot = vfs.ls();
    assertEquals(3, childrenOfRoot.size());

    for (Node child : childrenOfRoot) {
      if (child.getNodeId().equals(nodeId) && !child.isDir()) {
        File childFile = (File) child;
        assertEquals("createdByVFS.txt", childFile.getFilename());
        assertEquals("text/plain", childFile.getMimeType());
        break;
      }
    }

    vfs.rm(createdFile);
    List<Node> childrenAfterRm = vfs.ls();
    assertEquals(2, childrenAfterRm.size());
    for (Node child : childrenAfterRm) {
      assertNotEquals(nodeId, child.getNodeId());
    }
  }

  @Test
  void test_mv_dir_to_dir_success() throws JsonProcessingException {
    List<Node> children = vfs.ls();

    Directory subDir = null;
    Directory emptyDir = null;
    for (Node child : children) {
      if (child.getNodeId().equals(SUB_DIR_NODE_ID)) {
        subDir = (Directory) child;
        break;
      }
    }

    for (Node child : children) {
      if (child.getNodeId().equals(EMPTY_DIR_ID)) {
        emptyDir = (Directory) child;
        break;
      }
    }

    vfs.mv(subDir, emptyDir);

    assertEquals(1, vfs.ls().size());

    Directory pwd = vfs.cd(emptyDir);
    assertEquals(1, pwd.getChildren().size());

    Directory movedSubDir = (Directory) pwd.getChildren().get(0);
    assertTrue(movedSubDir.isDirty());

    for (Node child : movedSubDir.getChildren()) {
      assertTrue(child.isDirty());
    }

    String json = serializer.serialize(vfs);
    System.out.println(json);
  }
}
