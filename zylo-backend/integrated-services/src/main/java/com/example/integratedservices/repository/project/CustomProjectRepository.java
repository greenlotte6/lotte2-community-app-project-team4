package com.example.integratedservices.repository.project;

import com.example.integratedservices.dto.project.ProjectDTO;

import java.util.List;

public interface CustomProjectRepository {
    List<ProjectDTO> getNameAll();

}
