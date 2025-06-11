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

    private String title;
    private String content;


    private ProjectColumns toEntity() {
        return ProjectColumns.builder()
                .id(id)
                .title(title)
                .content(content)
                .build();
    }

}
