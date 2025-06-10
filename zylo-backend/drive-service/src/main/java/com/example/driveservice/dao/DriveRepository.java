package com.example.driveservice.dao;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DriveRepository {

  //TODO: 기본적인 CRUD 메서드 구현하기
  private final MongoTemplate template;
}
