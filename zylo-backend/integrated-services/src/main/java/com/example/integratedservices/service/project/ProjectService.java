package com.example.integratedservices.service.project;

import com.example.integratedservices.dto.project.ProjectCollaboratorsDTO;
import com.example.integratedservices.dto.project.ProjectDTO;
import com.example.integratedservices.dto.project.ProjectTaskDTO;
import com.example.integratedservices.entity.project.Project;
import com.example.integratedservices.entity.project.ProjectColumns;
import com.example.integratedservices.entity.project.ProjectTask;
import com.example.integratedservices.repository.jpa.project.ProjectCollaboratorsRepository;
import com.example.integratedservices.repository.jpa.project.ProjectColumnsRepository;
import com.example.integratedservices.repository.jpa.project.ProjectRepository;
import com.example.integratedservices.repository.jpa.project.ProjectTaskRepository;
import com.google.gson.Gson;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {

  private final ProjectRepository projectRepository;
  private final Gson gson;
  private final ProjectCollaboratorsRepository projectCollaboratorsRepository;
  private final ProjectTaskRepository projectTaskRepository;
  private final ProjectColumnsRepository projectColumnsRepository;


  public String getNameAll() {
    List<ProjectDTO> projects = projectRepository.getNameAll();
    return gson.toJson(projects);
  }


  public void projectInsert(ProjectDTO projectDTO) {

    Project project = projectDTO.toEntity();

    projectRepository.save(project);
  }

  public String getTeamAll() {
    List<ProjectCollaboratorsDTO> projectMember = projectCollaboratorsRepository.getTeamAll();
    return gson.toJson(projectMember);
  }

  public String getTaskAll() {
    List<ProjectTaskDTO> projectTask = projectTaskRepository.getTaskAll();
    //List<ProjectColumnsDTO> projectColumns = projectColumnsRepository.getColumnsAll();

    //ProjectBacklogDTO backlog = new ProjectBacklogDTO(projectTask, projectColumns);
    return gson.toJson(projectTask);
  }


  public void updateTaskColumn(int taskId, int columnId) {
    ProjectTask task = projectTaskRepository.findById(taskId)
        .orElseThrow(() -> new EntityNotFoundException("Task not found"));
    ProjectColumns column = projectColumnsRepository.findById(columnId)
        .orElseThrow(() -> new EntityNotFoundException("Column not found"));
    task.setProjectColumns(column);
    projectTaskRepository.save(task);
  }

  public void deleteTask(int taskId) {
    projectTaskRepository.deleteById(taskId);
  }

  public void deleteTeamMember(int memberId) {
    projectCollaboratorsRepository.deleteById(memberId);
  }

}
