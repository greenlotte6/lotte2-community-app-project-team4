package com.example.integratedservices.service.user;

import com.example.integratedservices.dto.auth.SignUpDTO;
import com.example.integratedservices.dto.user.UserDTO;
import com.example.integratedservices.entity.user.User;
import com.example.integratedservices.exception.DuplicateUsernameException;
import com.example.integratedservices.exception.IllegalUsernameException;
import com.example.integratedservices.exception.PasswordNotEqualsException;
import com.example.integratedservices.repository.UserRepository;
import com.google.gson.Gson;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository repo;
  private final Gson gson;

  private void checkPassword(String password, String passwordConfirm) {
    if (!password.equals(passwordConfirm)) {
      throw new PasswordNotEqualsException("Passwords do not match");
    }
  }

  private void checkUsername(String username) throws DuplicateUsernameException {
    long idCount = repo.countByUserId(username);
    if (idCount > 0) {
      String message = String.format("아이디 %s가 이미 존재합니다.", username);
      throw new DuplicateUsernameException(message);
    }
  }

  private boolean checkUsernameExists(String username) throws IllegalUsernameException {
    long idCount = repo.countByUserId(username);
    if (idCount == 0) {
      return false;
    } else {
      return true;
    }
  }

  public String getAll(int size) {
    List<UserDTO> users = repo.findAll(size);
    return gson.toJson(users);
  }

  public void signUp(SignUpDTO signUpDTO)
      throws PasswordNotEqualsException, DuplicateUsernameException {
    checkPassword(signUpDTO.getPassword(), signUpDTO.getPasswordConfirm());
    checkUsername(signUpDTO.getUserId());

    UserDTO userDTO = UserDTO.builder()
        .id(signUpDTO.getUserId())
        .email(signUpDTO.getEmail())
        .password(signUpDTO.getPassword())
        .planId(1)
        .planNameId(1)
        .status("normal")
        .build();
    User userEntity = userDTO.toEntity();
    repo.save(userEntity);
  }

  public void login(UserDTO userDTO) throws IllegalUsernameException {
    String userId = userDTO.getId();
    log.info("아이디 {}(으)로 로그인을 시도합니다.", userId);
    boolean idExists = checkUsernameExists(userId);
    if (idExists) {
      log.info("아이디 {}(이)가 존재합니다. JWT 발급 중...", userId);
      //TODO: JWT 발급
    } else {
      String message = String.format("로그인 실패. 아이디 %s가 존재하지 않습니다.", userId);
      log.info(message);
      throw new IllegalUsernameException(message);
    }
  }
}
