package com.example.integratedservices.security;

import com.example.integratedservices.dto.user.UserDTO;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {

  private UserDTO user;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    String userPlan = user.getPlanName().toUpperCase();
    List<GrantedAuthority> authorities = new ArrayList<>();
    authorities.add(new SimpleGrantedAuthority("ROLE_" + userPlan));
    return authorities;
  }

  @Override
  public String getPassword() {
    return user.getPassword();
  }

  @Override
  public String getUsername() {
    return user.getId();
  }

  @Override
  public boolean isAccountNonExpired() {
    return user.getStatus().equalsIgnoreCase("normal");
  }

  @Override
  public boolean isAccountNonLocked() {
    return user.getStatus().equalsIgnoreCase("normal");
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return user.getStatus().equalsIgnoreCase("normal");
  }
}
