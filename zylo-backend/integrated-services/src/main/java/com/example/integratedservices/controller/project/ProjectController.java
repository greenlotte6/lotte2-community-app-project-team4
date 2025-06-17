package com.example.integratedservices.controller.project;

import com.example.integratedservices.dto.project.ProjectDTO;
import com.example.integratedservices.dto.project.ProjectTaskDTO;
import com.example.integratedservices.entity.project.ProjectTask;
import com.example.integratedservices.repository.project.ProjectTaskRepository;
import com.example.integratedservices.service.project.ProjectService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/project", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
public class ProjectController {

  private final ProjectService projectService;
  private final ProjectTaskRepository projectTaskRepository;

  @GetMapping("")
  public ResponseEntity<String> projectGetAll() {

    // 로그인한 유저 정보
    //String uid = userDetails.getUsername();

    String result = projectService.getNameAll();

    return ResponseEntity.ok(result);
  }


  @PostMapping("")
  public ResponseEntity<String> projectInsert(@RequestBody ProjectDTO projectDTO, @RequestParam(required = false) Integer projectId) {


    projectService.projectInsert(projectDTO);

    return ResponseEntity.ok("프로젝트 등록 완료");

  }

  @GetMapping("/team")
  public ResponseEntity<String> teamGetAll() {

    String result =  projectService.getTeamAll();
    return ResponseEntity.ok(result);
  }

  @GetMapping("/task")
  public ResponseEntity<String> taskGetAll() {

    String task = projectService.getTaskAll();

    return ResponseEntity.ok(task);

  }

  @PostMapping("/task/{id}")
  public ResponseEntity<Void> updateTaskColumn(
          @PathVariable int id,
          @RequestBody Map<String, Integer> body) {
    int columnId = body.get("columnId");
    projectService.updateTaskColumn(id, columnId);
    return ResponseEntity.ok().build();
  }



  @PatchMapping("/task/{id}")
  public ResponseEntity<?> updateTask(
          @PathVariable int id,
          @RequestBody Map<String, String> body) {
    ProjectTask task = projectTaskRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Task not found"));
    task.setTitle(body.get("title"));
    task.setDescription(body.get("description"));
    projectTaskRepository.save(task);
    return ResponseEntity.ok().build();
  }

}
