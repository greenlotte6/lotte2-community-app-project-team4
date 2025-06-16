package com.example.integratedservices.repository.project;

import com.example.integratedservices.dto.project.ProjectCollaboratorsDTO;
import com.example.integratedservices.dto.project.ProjectDTO;

import java.util.List;

public interface CustomProjectCollaboratorsRepository {

    List<ProjectCollaboratorsDTO> getTeamAll();
}
