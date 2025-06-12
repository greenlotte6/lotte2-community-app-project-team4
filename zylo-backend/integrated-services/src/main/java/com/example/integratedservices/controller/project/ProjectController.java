package com.example.integratedservices.controller.project;

import com.example.integratedservices.dto.project.ProjectDTO;
import com.example.integratedservices.service.project.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/project", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
public class ProjectController {

  private final ProjectService projectService;

  @GetMapping("")
  public ResponseEntity<String> projectGetAll() {

    // 로그인한 유저 정보
    //String uid = userDetails.getUsername();

    String result = projectService.getNameAll();

    return ResponseEntity.ok(result);
  }


  @PostMapping("")
  public ResponseEntity<String> projectInsert(@RequestBody ProjectDTO projectDTO) {


    projectService.projectInsert(projectDTO);


    return ResponseEntity.ok("프로젝트 등록 완료");

  }


}
