package com.example.integratedservices.controller.project;

import com.example.integratedservices.dto.project.ProjectDTO;
import com.example.integratedservices.dto.project.ProjectTaskCreateRequestDTO;
import com.example.integratedservices.entity.project.Project;
import com.example.integratedservices.entity.project.ProjectColumns;
import com.example.integratedservices.entity.project.ProjectTask;
import com.example.integratedservices.repository.jpa.project.ProjectColumnsRepository;
import com.example.integratedservices.repository.jpa.project.ProjectRepository;
import com.example.integratedservices.repository.jpa.project.ProjectTaskRepository;
import com.example.integratedservices.service.project.ProjectService;
import jakarta.persistence.EntityNotFoundException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/project", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
public class ProjectController {

  private final ProjectService projectService;
  private final ProjectTaskRepository projectTaskRepository;
  private final ProjectRepository projectRepository;
  private final ProjectColumnsRepository projectColumnsRepository;

  @GetMapping("")
  public ResponseEntity<String> projectGetAll() {

    // 로그인한 유저 정보
    //String uid = userDetails.getUsername();

    String result = projectService.getNameAll();

    return ResponseEntity.ok(result);
  }


  @PostMapping("")
  public ResponseEntity<String> projectInsert(@RequestBody ProjectDTO projectDTO,
      @RequestParam(required = false) Integer projectId) {

    projectService.projectInsert(projectDTO);

    return ResponseEntity.ok("프로젝트 등록 완료");

  }

  @GetMapping("/team")
  public ResponseEntity<String> teamGetAll() {

    String result = projectService.getTeamAll();
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


  @PostMapping("/task")
  public ResponseEntity<?> createTask(@RequestBody ProjectTaskCreateRequestDTO req) {

    log.info(req.toString());
    ProjectTask task = new ProjectTask();
    task.setTitle(req.getTitle());
    task.setDescription(req.getDescription());

    // id로 실제 엔티티 조회
    Project project = projectRepository.findById(req.getProjectId())
        .orElseThrow(() -> new EntityNotFoundException("Project not found"));

    ProjectColumns columns = projectColumnsRepository.findById(req.getProjectColumns())
        .orElseThrow(() -> new EntityNotFoundException("Columns not found"));

    task.setProject(project);
    task.setProjectColumns(columns);

    projectTaskRepository.save(task);
    return ResponseEntity.ok(task);
  }

  @DeleteMapping("/task/{id}")
  public ResponseEntity<Void> deleteTask(@PathVariable int id) {

    projectService.deleteTask(id);
    return ResponseEntity.ok().build();
  }


  @DeleteMapping("/team/{id}")
  public ResponseEntity<Void> deleteTeamMember(@PathVariable int id) {

    log.info(String.valueOf(id));
    projectService.deleteTeamMember(id);
    return ResponseEntity.ok().build();
  }


}
