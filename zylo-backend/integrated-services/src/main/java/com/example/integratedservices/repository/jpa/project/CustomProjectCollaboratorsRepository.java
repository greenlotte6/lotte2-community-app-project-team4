package com.example.integratedservices.repository.jpa.project;

import com.example.integratedservices.dto.project.ProjectCollaboratorsDTO;
import java.util.List;

public interface CustomProjectCollaboratorsRepository {

  List<ProjectCollaboratorsDTO> getTeamAll();
}
