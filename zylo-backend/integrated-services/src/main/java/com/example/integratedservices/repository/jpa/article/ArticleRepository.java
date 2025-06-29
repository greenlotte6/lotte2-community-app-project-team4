package com.example.integratedservices.repository.jpa.article;

import com.example.integratedservices.entity.article.Article;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

  //필요 시 categoryId로 필터링하는 커스텀 메서드도 추가가능
  List<Article> findByCategoryId(int categoryId);
}
