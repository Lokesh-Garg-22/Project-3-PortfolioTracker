package com.lokesh.portfolioTracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootEntryPath {

    @GetMapping
    public String rootEntryPath() {
        return "API Server is Running!";
    }

}
