package com.example.driveservice.exception;

public class OutOfCapacityException extends RuntimeException {

  public OutOfCapacityException(String message) {
    super(message);
  }
}
