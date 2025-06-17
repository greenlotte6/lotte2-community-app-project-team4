package com.example.integratedservices.repository.project;

import com.example.integratedservices.dto.project.ProjectDTO;
import com.example.integratedservices.dto.project.ProjectTaskDTO;
import com.example.integratedservices.entity.project.*;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CustomProjectTaskRepositoryImpl implements CustomProjectTaskRepository {


    private final JPAQueryFactory query;
    private final QProjectTask projectTask = QProjectTask.projectTask;
    private final QProjectRows projectRows = QProjectRows.projectRows;
    private final QProjectColumns projectColumns = QProjectColumns.projectColumns;


    @Override
    public List<ProjectTaskDTO> getTaskAll(){
        return query.select(Projections.constructor(ProjectTaskDTO.class, projectTask.id, projectTask.project, projectTask.projectColumns, projectTask.title, projectTask.description))
                .from(projectTask)
                .fetch();
    }

}
