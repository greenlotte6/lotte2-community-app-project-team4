package com.example.integratedservices.service;

import com.example.integratedservices.dto.user.UserDTO;
import com.example.integratedservices.repository.UserRepository;
import com.google.gson.Gson;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository repo;
  private final Gson gson;

  public String getAll(int size) {
    List<UserDTO> users = repo.findAll(size);
    return gson.toJson(users);
  }
}
