package com.example.integratedservices.dto.project;

import com.example.integratedservices.entity.project.Project;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {

    private int id;
    private String name;
    private int column;
    private int row;

    private Date startDate;
    private Date endDate;

    public ProjectDTO(int id, String name) {
        this.id = id;
        this.name = name;
    }


    public Project toEntity() {
        return Project.builder()
                .id(id)
                .name(name)
                .column(column)
                .row(row)
                .startDate(startDate)
                .endDate(endDate)
                .build();
    }

}
