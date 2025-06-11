package com.example.integratedservices.exception;

public class IllegalRefreshTokenException extends RuntimeException {

  public IllegalRefreshTokenException(String message) {
    super(message);
  }
}
