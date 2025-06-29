package com.example.integratedservices.dto.project;

import com.example.integratedservices.entity.project.ProjectColumns;
import com.example.integratedservices.entity.project.ProjectTask;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
public class ProjectBacklogDTO {

    private List<ProjectTaskDTO> projectTask;
    private List<ProjectColumnsDTO> projectColumns;

    public ProjectBacklogDTO(List<ProjectTaskDTO> projectTask, List<ProjectColumnsDTO> projectColumns) {
        this.projectTask = projectTask;
        this.projectColumns = projectColumns;
    }

}
