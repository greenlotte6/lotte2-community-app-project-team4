package com.example.chatservice.controller;

import com.example.chatservice.config.CustomUserDetails;
import com.example.chatservice.service.FriendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@Controller
@RestController
@RequestMapping("/api/friend")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

    @GetMapping("")
    public List<String> getFriends(@AuthenticationPrincipal CustomUserDetails user) {
        List<String> friendIds = friendService.getFriends(user);

        log.info("friendIds: {}", friendIds);
        return friendIds;
    }


}
