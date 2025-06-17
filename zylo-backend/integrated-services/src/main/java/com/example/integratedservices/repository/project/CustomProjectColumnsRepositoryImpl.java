package com.example.integratedservices.repository.project;

import com.example.integratedservices.dto.project.ProjectColumnsDTO;
import com.example.integratedservices.dto.project.ProjectTaskDTO;
import com.example.integratedservices.entity.project.QProjectColumns;
import com.example.integratedservices.entity.project.QProjectRows;
import com.example.integratedservices.entity.project.QProjectTask;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CustomProjectColumnsRepositoryImpl implements CustomProjectColumnsRepository {


    private final JPAQueryFactory query;
    private final QProjectTask projectTask = QProjectTask.projectTask;
    private final QProjectRows projectRows = QProjectRows.projectRows;
    private final QProjectColumns projectColumns = QProjectColumns.projectColumns;


    @Override
    public List<ProjectColumnsDTO> getColumnsAll(){
        return query.select(Projections.constructor(ProjectColumnsDTO.class, projectColumns.name))
                .from(projectColumns)
                .fetch();
    }

}
