package com.example.integratedservices.repository.project;

import com.example.integratedservices.dto.project.ProjectCollaboratorsDTO;
import com.example.integratedservices.entity.project.ProjectCollaborators;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectCollaboratorsRepository extends JpaRepository<ProjectCollaborators, Integer>, CustomProjectCollaboratorsRepository {

}
