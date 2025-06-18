package com.example.integratedservices.repository.jpa.project;

import com.example.integratedservices.dto.project.ProjectTaskDTO;
import com.example.integratedservices.entity.project.QProjectColumns;
import com.example.integratedservices.entity.project.QProjectRows;
import com.example.integratedservices.entity.project.QProjectTask;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomProjectTaskRepositoryImpl implements CustomProjectTaskRepository {


  private final JPAQueryFactory query;
  private final QProjectTask projectTask = QProjectTask.projectTask;
  private final QProjectRows projectRows = QProjectRows.projectRows;
  private final QProjectColumns projectColumns = QProjectColumns.projectColumns;


  @Override
  public List<ProjectTaskDTO> getTaskAll() {
    return query.select(
            Projections.constructor(ProjectTaskDTO.class, projectTask.id, projectTask.project,
                projectTask.projectColumns, projectTask.title, projectTask.description))
        .from(projectTask)
        .fetch();
  }

}
