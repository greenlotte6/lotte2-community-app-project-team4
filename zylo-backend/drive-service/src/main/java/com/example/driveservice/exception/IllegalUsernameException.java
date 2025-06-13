package com.example.driveservice.exception;

public class IllegalUsernameException extends RuntimeException {

  public IllegalUsernameException(String message) {
    super(message);
  }
}
