package com.example.integratedservices.dto.project;

import com.example.integratedservices.entity.project.ProjectRows;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectRowsDTO {

    private int id;

    private String name;


    private ProjectRows toEntity() {
        return ProjectRows.builder()
                .id(id)
                .name(name)
                .build();
    }

}
