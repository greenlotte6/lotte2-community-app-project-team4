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
public class ProjectDTO {

    private int id;
    private String name;
    private String desc;
    private int column;
    private int row;


    private Date startDate;
    private Date endDate;

    public ProjectDTO(int id, String name, String  desc, int column, int row, Date startDate, Date endDate) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.column = column;
        this.row = row;
        this.startDate = startDate;
        this.endDate = endDate;
    }


    public Project toEntity() {
        return Project.builder()
                .id(id)
                .name(name)
                .desc(desc)
                .column(column)
                .row(row)
                .startDate(startDate)
                .endDate(endDate)
                .build();
    }

}
