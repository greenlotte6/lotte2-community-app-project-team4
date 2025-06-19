package com.example.integratedservices.repository.jpa.project;

import com.example.integratedservices.dto.project.ProjectTaskDTO;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomProjectTaskRepository {

  List<ProjectTaskDTO> getTaskAll();
}
