package com.example.driveservice.dao;

import com.example.driveservice.document.FileDocument;
import com.example.driveservice.document.UploadsDocument;
import com.example.driveservice.exception.IllegalUsernameException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DriveRepository {

  private final MongoTemplate template;

  public boolean usernameExists(String username) {
    Query query = new Query(Criteria.where("username").is(username));
    return template.exists(query, UploadsDocument.class);
  }

  public void save(String username, FileDocument fileDocument) {
    //TODO: Update current capacity
    Query query = new Query(Criteria.where("uid").is(username));
    Update update = new Update().setOnInsert("uid", username)
        .push("files", fileDocument);
    template.upsert(query, update, UploadsDocument.class);
  }

  public long findCapacity(String username) throws IllegalUsernameException {
    boolean exists = usernameExists(username);

    if (!exists) {
      String message = String.format("사용자 %s(이)가 존재하지 않습니다.", username);
      throw new IllegalUsernameException(message);
    }
    Query query = new Query(Criteria.where("uid").is(username));
    query.fields().include("capacity");

    UploadsDocument result = template.findOne(query, UploadsDocument.class);
    if (result != null) {
      return result.getCapacity();
    }
    return 0;
  }

  public long findCurrentCapacity(String username) throws IllegalUsernameException {
    boolean exists = usernameExists(username);

    if (!exists) {
      String message = String.format("사용자 %s(이)가 존재하지 않습니다.", username);
      throw new IllegalUsernameException(message);
    }

    Query query = new Query(Criteria.where("uid").is(username));
    query.fields().include("currentCapacity");

    UploadsDocument result = template.findOne(query, UploadsDocument.class);
    if (result != null) {
      return result.getCurrentCapacity();
    }
    return 0;
  }
}
