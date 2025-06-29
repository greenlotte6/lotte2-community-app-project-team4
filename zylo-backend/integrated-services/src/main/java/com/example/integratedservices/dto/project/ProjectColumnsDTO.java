package com.example.integratedservices.dto.project;

import com.example.integratedservices.entity.project.ProjectColumns;
import com.example.integratedservices.entity.project.ProjectRows;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectColumnsDTO {

    private int id;

    private String name;



    public ProjectColumnsDTO(String name) {
        this.name = name;
    }


    private ProjectColumns toEntity() {
        return ProjectColumns.builder()
                .id(id)
                .name(name)
                .build();
    }

}
