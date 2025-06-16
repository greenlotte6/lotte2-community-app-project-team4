package com.example.integratedservices.entity.project;

import jakarta.persistence.*;
import jdk.jfr.Description;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project_task")
public class ProjectTask {

    @Id
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_columns_id")
    private ProjectColumns projectColumns;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

}
