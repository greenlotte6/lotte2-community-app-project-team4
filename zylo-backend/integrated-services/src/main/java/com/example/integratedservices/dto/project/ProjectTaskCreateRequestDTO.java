package com.example.integratedservices.dto.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTaskCreateRequestDTO {

    private Integer projectId;
    private Integer projectColumns;
    private String title;
    private String description;




}
