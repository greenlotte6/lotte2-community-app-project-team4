package com.example.driveservice.dao.mongo;

import com.example.driveservice.document.Directory;
import com.example.driveservice.document.File;
import com.example.driveservice.document.Node;
import com.example.driveservice.exception.IllegalUsernameException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.bson.Document;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DriveRepository {

  private final MongoTemplate template;

  public boolean fileExists(String username, String filename) {
    Criteria condition = Criteria.where("owner").is(username).and("filename").is(filename);
    Query query = new Query(condition);
    File result = template.findOne(query, File.class);
    return result != null;
  }

  public void save(Node node) {
    template.save(node, "vfs");
  }

  public boolean isSavable(File file, long maxSize) {
    long fileSize = file.getSize();
    long currentCapacity = findCurrentSize(file.getOwner());
    return fileSize + currentCapacity <= maxSize;
  }

  public long findCurrentSize(String username) throws IllegalUsernameException {
    MatchOperation condition = Aggregation.match(
        Criteria.where("owner").is(username).and("isDir").is(false));
    GroupOperation group = Aggregation.group().sum("size").as("currentSize");
    Aggregation aggregation = Aggregation.newAggregation(condition, group);
    AggregationResults<Document> result = template.aggregate(aggregation, "vfs", Document.class);
    Document output = result.getUniqueMappedResult();
    return output != null ? output.getLong("currentSize") : 0L;
  }

  public List<Node> findAllByUsername(String username) {
    Criteria condition = Criteria.where("owner").is(username);
    Sort sorting = Sort.by(Sort.Direction.ASC, "depth");
    Query query = new Query();
    query.addCriteria(condition);
    query.with(sorting);

    List<Document> docs = template.find(query, Document.class, "vfs");
    List<Node> result = new ArrayList<>();
    for (Document doc : docs) {
      boolean isDir = doc.getBoolean("isDir");
      if (isDir) {
        Directory dir = template.getConverter().read(Directory.class, doc);
        result.add(dir);
      } else {
        File file = template.getConverter().read(File.class, doc);
        result.add(file);
      }
    }
    return result;
  }

  public void delete(Node node) {
    template.remove(node, "vfs");
  }

  public void bulkDelete(List<Node> node) {
  }
}
