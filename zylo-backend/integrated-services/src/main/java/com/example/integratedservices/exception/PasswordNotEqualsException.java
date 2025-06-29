package com.example.integratedservices.exception;

public class PasswordNotEqualsException extends RuntimeException {

  public PasswordNotEqualsException(String message) {
    super(message);
  }
}
