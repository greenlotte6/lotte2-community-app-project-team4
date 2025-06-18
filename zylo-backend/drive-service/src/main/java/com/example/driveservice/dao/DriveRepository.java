package com.example.driveservice.dao;

import com.example.driveservice.document.FileDocument;
import com.example.driveservice.document.UploadsDocument;
import com.example.driveservice.exception.IllegalUsernameException;
import java.util.List;
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
    Query query = new Query(Criteria.where("uid").is(username));
    return template.exists(query, UploadsDocument.class);
  }

  public UploadsDocument fileExists(String username, String filename) {
    Query query = new Query(
        Criteria.where("uid").is(username).and("files.filename").is(filename));
    return template.findOne(query, UploadsDocument.class);
  }

  public void save(String username, FileDocument fileDocument) {
    long currentCapacity = findCurrentCapacity(username);
    UploadsDocument uploadList = fileExists(username, fileDocument.getFilename());
    if (uploadList != null) { //같은 이름의 파일이 있는 경우
      FileDocument originalFile = uploadList.getFiles().get(0);
      long originalSize = originalFile.getSize(); // 기존 파일의 크기 가져오기
      long newSize = fileDocument.getSize(); // 새로 업로드 할 파일의 크기
      long updatedSize = currentCapacity - originalSize + newSize;
      Query query = new Query(
          Criteria.where("uid").is(username).and("files.filename").is(fileDocument.getFilename()));
      Update update = new Update()
          .set("currentCapacity", updatedSize)
          .set("files.$.uploadPath", fileDocument.getUploadPath())
          .set("files.$.size", fileDocument.getSize())
          .set("files.$.uploadDate", fileDocument.getUploadDate());
      template.updateFirst(query, update, UploadsDocument.class);
    } else {
      long updatedCapacity = currentCapacity + fileDocument.getSize();
      Query query = new Query(Criteria.where("uid").is(username));
      Update update = new Update().setOnInsert("uid", username)
          .push("files", fileDocument)
          .set("currentCapacity", updatedCapacity);
      template.upsert(query, update, UploadsDocument.class);
    }
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

  public List<UploadsDocument> findAllByUsername(String username) {
    Query query = new Query(Criteria.where("uid").is(username));
    return template.find(query, UploadsDocument.class);
  }
}
