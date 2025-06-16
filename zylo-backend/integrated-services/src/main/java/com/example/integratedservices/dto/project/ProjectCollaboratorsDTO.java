package com.example.integratedservices.dto.project;

import com.example.integratedservices.dto.user.UserDTO;
import com.example.integratedservices.entity.project.Project;
import com.example.integratedservices.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
public class ProjectCollaboratorsDTO {

    private int id;

    // user
    private String userId;

    // project
    private int projectId;

    public ProjectCollaboratorsDTO(int id, String userId, int projectId) {
        this.id = id;
        this.userId = userId;
        this.projectId = projectId;
    }

}
