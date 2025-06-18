package com.example.integratedservices.repository.jpa.project;

import com.example.integratedservices.entity.project.ProjectCollaborators;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectCollaboratorsRepository extends
    JpaRepository<ProjectCollaborators, Integer>, CustomProjectCollaboratorsRepository {

}
