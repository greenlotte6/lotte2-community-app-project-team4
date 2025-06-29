package com.example.driveservice.fs;

import com.example.driveservice.document.Directory;
import com.example.driveservice.document.File;
import com.example.driveservice.document.Node;
import com.example.driveservice.exception.IllegalUsernameException;
import java.io.InputStream;
import java.util.List;
import java.util.NoSuchElementException;

public interface VirtualFileSystem {

  Directory root();

  Directory pwd();

  void touch(File newFile, InputStream fileStream) throws IllegalArgumentException;

  void mkdir(Directory newDir) throws IllegalArgumentException;

  void mv(Node src, Directory dest) throws IllegalArgumentException, NoSuchElementException;

  void rm(Node target) throws IllegalUsernameException;

  Directory cd(Node target) throws IllegalUsernameException;

  List<Node> ls();

  void flush();
}
