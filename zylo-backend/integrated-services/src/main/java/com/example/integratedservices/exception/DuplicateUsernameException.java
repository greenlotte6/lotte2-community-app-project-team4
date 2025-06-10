package com.example.integratedservices.exception;

public class DuplicateUsernameException extends RuntimeException {

  public DuplicateUsernameException(String message) {
    super(message);
  }
}
