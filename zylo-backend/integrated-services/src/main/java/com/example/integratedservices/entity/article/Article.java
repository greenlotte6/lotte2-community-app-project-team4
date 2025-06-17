package com.example.integratedservices.entity.article;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "article")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="user_id", nullable=false)
    private String userId;

    @Column(name="category_id")
    private int categoryId;

    @Column(name = "article_thumbnails_id")
    private Integer articleThumbnailsId;

    @Column(name = "title")
    private String title;

    @Column(name="subtitle")
    private String subtitle;

    @Column(name = "content")
    private String content;

    @Column(name = "images_id")
    private Integer imagesId;  // nullable 허용

    @Column(name="created_at")
    private Date createdAt;

    @Column(name = "views")
    private int views;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = new Date();
        }
    }

    public void setUserId(String tempUser) {
    }
}
