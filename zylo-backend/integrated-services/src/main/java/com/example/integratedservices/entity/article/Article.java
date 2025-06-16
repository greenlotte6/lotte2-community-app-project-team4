package com.example.integratedservices.entity.article;
import jakarta.persistence.*;
import kotlin.text.UStringsKt;
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
    private int id;
}
