package com.example.integratedservices.repository.article;

import com.example.integratedservices.entity.article.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

    //필요 시 categoryId로 필터링하는 커스텀 메서드도 추가가능
    List<Article> findByCategoryId(int categoryId);
}
