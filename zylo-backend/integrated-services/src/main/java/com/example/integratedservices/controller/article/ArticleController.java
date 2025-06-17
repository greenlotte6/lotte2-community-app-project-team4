package com.example.integratedservices.controller.article;

import com.example.integratedservices.dto.article.ArticleDTO;
import com.example.integratedservices.entity.article.Article;
import com.example.integratedservices.service.article.ArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/article", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Slf4j
public class ArticleController {
    private final ArticleService articleService;


    @GetMapping("")
    public List<ArticleDTO> listArticles() {
        log.info("GET /article 요청 도착");

        return articleService.getArticles();
    }
    @GetMapping("/{id}")
    public ArticleDTO getArticle(@PathVariable int id){
        return articleService.getArticleById(id);
    }

    @PostMapping("")
    public ResponseEntity<ArticleDTO> createArticle(@RequestBody ArticleDTO articleDTO){
        log.info("POST /article요청 도착 데이터 : {}", articleDTO);
        ArticleDTO createdArticle= articleService.createArticle(articleDTO);
        return ResponseEntity.ok(createdArticle);
    }
}