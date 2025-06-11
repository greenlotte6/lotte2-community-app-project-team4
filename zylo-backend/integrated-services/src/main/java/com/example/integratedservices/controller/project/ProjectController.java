package com.example.integratedservices.controller;

import com.example.integratedservices.service.project.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/project", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("")
    public ResponseEntity<String> projectGetAll(){
        
        // 로그인한 유저 정보
        //String uid = userDetails.getUsername();

        String result = projectService.getNameAll();

        return ResponseEntity.ok(result);
    }


}
