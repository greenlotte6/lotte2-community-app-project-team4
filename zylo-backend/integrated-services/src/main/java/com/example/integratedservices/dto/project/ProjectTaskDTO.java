package com.example.integratedservices.dto.project;


import com.example.integratedservices.entity.project.Project;
import com.example.integratedservices.entity.project.ProjectColumns;
import com.example.integratedservices.entity.project.ProjectRows;
import com.example.integratedservices.entity.project.ProjectTask;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProjectTaskDTO {


    private int id;
    private Project project;
    private ProjectColumns projectColumns;
    private String title;
    private String description;


    private ProjectTask toEntity() {
        return ProjectTask.builder()
                .id(id)
                .project(project)
                .title(title)
                .description(description)
                .build();
    }

}
