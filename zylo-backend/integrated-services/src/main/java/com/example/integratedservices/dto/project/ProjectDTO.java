package com.example.integratedservices.dto.project;

import com.example.integratedservices.entity.project.Project;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
public class ProjectDTO {

    private int id;
    private String name;
    private String description;


    private Date startDate;
    private Date endDate;

    public ProjectDTO(int id, String name, String description, Date startDate, Date endDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }


    public Project toEntity() {
        return Project.builder()
                .id(id)
                .name(name)
                .description(description)
                .startDate(startDate)
                .endDate(endDate)
                .build();
    }

}
