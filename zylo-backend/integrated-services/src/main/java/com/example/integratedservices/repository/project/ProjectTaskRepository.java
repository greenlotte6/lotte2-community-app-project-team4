package com.example.integratedservices.repository.project;

import com.example.integratedservices.entity.project.Project;
import com.example.integratedservices.entity.project.ProjectTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectTaskRepository extends JpaRepository<ProjectTask, Integer>, CustomProjectTaskRepository  {

}
