package com.example.integratedservices.advice;

import com.example.integratedservices.dto.response.ErrorResponseDTO;
import com.example.integratedservices.exception.DuplicateUsernameException;
import java.sql.SQLException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalJPAExceptionHandler {

  @ExceptionHandler({DataIntegrityViolationException.class, DuplicateUsernameException.class})
  public ResponseEntity<Object> handleDataIntegrityViolationException(
      Exception e) {
    ErrorResponseDTO error = new ErrorResponseDTO("데이터 무결성 오류", e.getMessage());

    return ResponseEntity.internalServerError()
        .body(error);
  }

  @ExceptionHandler(SQLException.class)
  public ResponseEntity<Object> handleSQLException(SQLException e) {
    ErrorResponseDTO error = new ErrorResponseDTO("SQL 문법 오류", e.getMessage());

    return ResponseEntity.internalServerError().body(error);
  }
}
