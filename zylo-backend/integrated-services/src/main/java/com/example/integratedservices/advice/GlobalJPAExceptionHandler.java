package com.example.integratedservices.advice;

import com.example.integratedservices.dto.response.ErrorResponseDTO;
import com.example.integratedservices.exception.DuplicateUsernameException;
import com.example.integratedservices.exception.IllegalRefreshTokenException;
import java.sql.SQLException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

  @ExceptionHandler({BadCredentialsException.class, UsernameNotFoundException.class})
  public ResponseEntity<Object> handleLoginException(Exception e) {
    ErrorResponseDTO error = new ErrorResponseDTO("로그인 실패", e.getMessage());
    return ResponseEntity.badRequest().body(error);
  }

  @ExceptionHandler(IllegalRefreshTokenException.class)
  public ResponseEntity<Object> handleIllegalRefreshTokenException(Exception e) {
    ErrorResponseDTO error = new ErrorResponseDTO("토큰 검증 실패", e.getMessage());
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
  }
}
