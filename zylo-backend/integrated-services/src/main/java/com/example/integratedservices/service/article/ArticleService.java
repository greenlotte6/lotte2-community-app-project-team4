package com.example.integratedservices.service.article;

import com.example.integratedservices.dto.project.ProjectDTO;
import com.example.integratedservices.entity.project.Project;
import com.example.integratedservices.repository.article.ArticleRepository;
import com.example.integratedservices.repository.project.ProjectRepository;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final Gson gson;
}
