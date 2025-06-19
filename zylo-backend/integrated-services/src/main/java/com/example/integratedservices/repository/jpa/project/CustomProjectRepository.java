package com.example.integratedservices.repository.jpa.project;

import com.example.integratedservices.dto.project.ProjectDTO;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomProjectRepository {

  List<ProjectDTO> getNameAll();
}
