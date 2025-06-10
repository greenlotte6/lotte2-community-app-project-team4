package com.example.driveservice.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/drive/download", produces = MediaType.APPLICATION_JSON_VALUE)
public class FileDownloadController {

}
