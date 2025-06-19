package com.example.chatservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "friends")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Friend {

    private String userId;

    private List<String> friends;
}
