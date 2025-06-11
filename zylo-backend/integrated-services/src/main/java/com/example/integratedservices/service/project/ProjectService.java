package com.example.integratedservices.service.project;

import com.example.integratedservices.dto.project.ProjectDTO;
import com.example.integratedservices.repository.project.ProjectRepository;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final Gson gson;


    public String getNameAll(){
        List<ProjectDTO> projects = projectRepository.getNameAll();
        return gson.toJson(projects);
    }




}
