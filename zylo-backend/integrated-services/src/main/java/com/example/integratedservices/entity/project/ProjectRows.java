package com.example.integratedservices.entity.project;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project_columns")
public class ProjectRows {

    @Id
    private int id;

    @Column(name = "name")
    private String name;

}
