package com.example.driveservice.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DriveApiController {

  @PostMapping("/drive/create")
  public ResponseEntity<String> createUser(@RequestHeader("X-User-Name") String username,
      @RequestHeader("X-User-Role") String role) {
    //TODO integrated-services에서 회원가입 완료 시 role 값에 따라 mongodb의 drive::uploads에
    //     신규 document 추가
    return null;
  }

  @PutMapping("/user/update")
  public ResponseEntity<String> update(@RequestHeader("X-User-Role") String updatedRole) {
    // TODO 1. MongoDB에서 특정 사용자의 role을 업데이트
    // TODO 2. role이 free -> plus라면 드라이브 사용 가능 용량을 업그레이드.
    // TODO 3. role이 plus -> free라면 드라이브 사용 가능 용량을 다운그레이드
    return null;
  }
}
