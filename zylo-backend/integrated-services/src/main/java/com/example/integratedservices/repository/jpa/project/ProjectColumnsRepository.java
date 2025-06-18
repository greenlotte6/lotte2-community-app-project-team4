package com.example.integratedservices.repository.jpa.project;

import com.example.integratedservices.entity.project.ProjectColumns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectColumnsRepository extends JpaRepository<ProjectColumns, Integer>,
    CustomProjectColumnsRepository {

}
