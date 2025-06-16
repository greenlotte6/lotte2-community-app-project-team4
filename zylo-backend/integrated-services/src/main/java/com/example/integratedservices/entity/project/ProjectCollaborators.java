package com.example.integratedservices.entity.project;

import com.example.integratedservices.entity.user.User;
import jakarta.persistence.*;
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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
}
