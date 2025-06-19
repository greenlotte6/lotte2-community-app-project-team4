package com.example.driveservice.fs;

import com.example.driveservice.document.Directory;
import com.example.driveservice.document.Node;
import com.example.driveservice.exception.IllegalUsernameException;
import java.util.List;

public interface VirtualFileSystem {

  Directory root();

  Directory pwd();

  void create(Node newNode) throws IllegalArgumentException;

  Directory mv(Node src, Node dest) throws IllegalArgumentException;

  void rm(Node target) throws IllegalUsernameException;

  Directory cd(Node target) throws IllegalUsernameException;

  List<Node> ls();

  void flush();
}
