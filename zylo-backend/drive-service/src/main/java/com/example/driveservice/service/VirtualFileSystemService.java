package com.example.driveservice.service;

import com.example.driveservice.fs.VirtualFileSystemSerializer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Deprecated
public class VirtualFileSystemService {

  private final VirtualFileSystemSerializer serializer;

}
