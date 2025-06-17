package com.example.integratedservices.dto.article;

import com.example.integratedservices.entity.article.Article;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ArticleDTO {
    private int id;
    private String userId;
    private int categoryId;
    private String title;
    private String subtitle;
    private String content;
    private Date createdAt;
    private int views;
    private Integer articleThumbnailsId;
    private Integer imagesId;  // int -> Integer (nullable 허용)

    public ArticleDTO(Article article) {
        this.id = article.getId();
        this.userId = article.getUserId();
        this.categoryId = article.getCategoryId();
        this.title = article.getTitle();
        this.subtitle = article.getSubtitle();
        this.content = article.getContent();
        this.createdAt = article.getCreatedAt();
        this.views = article.getViews();
        this.articleThumbnailsId = article.getArticleThumbnailsId();
        this.imagesId = article.getImagesId();
    }

    public Article toEntity() {
        return Article.builder()
                .userId(userId)
                .categoryId(categoryId)
                .title(title)
                .subtitle(subtitle)
                .content(content)
                .articleThumbnailsId(articleThumbnailsId != null && articleThumbnailsId != 0 ? articleThumbnailsId : null)
                .views(views)
                .imagesId(imagesId != null && imagesId != 0 ? imagesId : null)
                .build();
    }
}
