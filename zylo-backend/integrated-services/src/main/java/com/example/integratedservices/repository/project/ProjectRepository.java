package com.example.integratedservices.repository.project;

import com.example.integratedservices.entity.project.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository  extends JpaRepository<Project, Integer>, CustomProjectRepository {
}
