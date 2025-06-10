package com.example.integratedservices.service.security;

import com.example.integratedservices.dto.user.UserDTO;
import com.example.integratedservices.repository.UserRepository;
import com.example.integratedservices.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

  private final UserRepository repo;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    UserDTO foundUser = repo.findByUserId(username);
    if (foundUser == null) {
      return null;
    }
    return new CustomUserDetails(foundUser);
  }
}
