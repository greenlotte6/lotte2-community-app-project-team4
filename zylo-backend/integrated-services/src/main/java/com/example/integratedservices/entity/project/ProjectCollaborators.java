package com.example.integratedservices.entity.project;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import kotlin.text.UStringsKt;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project_collaborators")
public class ProjectCollaborators {

    @Id
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "project_id")
    private int projectId ;

}
