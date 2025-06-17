package com.example.integratedservices.service.article;

import com.example.integratedservices.dto.article.ArticleDTO;
import com.example.integratedservices.entity.article.Article;
import com.example.integratedservices.repository.article.ArticleRepository;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final Gson gson;

    public List<ArticleDTO> getArticles() {
        List<Article> articles = articleRepository.findAll();
        log.info("전체 게시물 수:{}", articles.size());
        return articles.stream()
                .map(ArticleDTO::new)
                .collect(Collectors.toList());

    }

    public ArticleDTO getArticleById(int id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 게시물이 없습니다."));
        return new ArticleDTO(article);
    }

    public ArticleDTO createArticle(ArticleDTO articleDTO) {
        try {
            Article article = articleDTO.toEntity();

            if (article.getUserId() == null) {
                article.setUserId("tempUser");
            }

            Article saved = articleRepository.save(articleDTO.toEntity());
            return new ArticleDTO(saved);
        } catch (Exception e) {
            log.error("게시글 등록 중 오류 발생", e);
            throw e;
        }
    }
}
