package com.example.integratedservices.repository.project;

import com.example.integratedservices.dto.project.ProjectDTO;
import com.example.integratedservices.dto.project.ProjectTaskDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomProjectTaskRepository {

    List<ProjectTaskDTO> getTaskAll();
}
