package com.example.integratedservices.repository.project;

import com.example.integratedservices.dto.project.ProjectCollaboratorsDTO;
import com.example.integratedservices.dto.project.ProjectDTO;
import com.example.integratedservices.entity.project.QProject;
import com.example.integratedservices.entity.project.QProjectCollaborators;
import com.example.integratedservices.entity.project.QProjectColumns;
import com.example.integratedservices.entity.project.QProjectRows;
import com.example.integratedservices.entity.user.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CustomProjectCollaboratorsRepositoryImpl implements CustomProjectCollaboratorsRepository {

    private final JPAQueryFactory query;
    private final QProjectCollaborators projectCollaborators = QProjectCollaborators.projectCollaborators;
    private final QUser user = QUser.user;
    private final QProject project = QProject.project;
    private final ProjectRepository projectRepository;

    public List<ProjectCollaboratorsDTO> getTeamAll() {
        return query.select(Projections.constructor(
                        ProjectCollaboratorsDTO.class,
                        projectCollaborators.id,
                        projectCollaborators.user.id,
                        projectCollaborators.project.id
                ))
                .from(projectCollaborators)
                .join(projectCollaborators.user, user)
                .join(projectCollaborators.project, project)
                .fetch();
    }

}
