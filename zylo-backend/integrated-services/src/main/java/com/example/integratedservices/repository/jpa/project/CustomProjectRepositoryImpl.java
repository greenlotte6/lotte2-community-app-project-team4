package com.example.integratedservices.repository.jpa.project;

import com.example.integratedservices.dto.project.ProjectDTO;
import com.example.integratedservices.entity.project.QProject;
import com.example.integratedservices.entity.project.QProjectColumns;
import com.example.integratedservices.entity.project.QProjectRows;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomProjectRepositoryImpl implements CustomProjectRepository {

  private final JPAQueryFactory query;
  private final QProject project = QProject.project;
  private final QProjectRows projectRows = QProjectRows.projectRows;
  private final QProjectColumns projectColumns = QProjectColumns.projectColumns;


  @Override
  public List<ProjectDTO> getNameAll() {
    return query.select(
            Projections.constructor(ProjectDTO.class, project.id, project.name, project.description,
                project.startDate, project.endDate))
        .from(project)
        .fetch();
  }

}
