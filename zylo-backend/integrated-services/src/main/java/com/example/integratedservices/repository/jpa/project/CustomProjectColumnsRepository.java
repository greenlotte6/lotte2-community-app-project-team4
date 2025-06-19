package com.example.integratedservices.repository.jpa.project;

import com.example.integratedservices.dto.project.ProjectColumnsDTO;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomProjectColumnsRepository {

  List<ProjectColumnsDTO> getColumnsAll();
}
