package com.example.integratedservices.repository.jpa.project;

import com.example.integratedservices.entity.project.ProjectTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTaskRepository extends JpaRepository<ProjectTask, Integer>,
    CustomProjectTaskRepository {

}
