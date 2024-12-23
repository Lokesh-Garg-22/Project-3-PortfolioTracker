package com.lokesh.portfolioTracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorld {

    @GetMapping(path = "/hello")
    public String helloWorld(String[] args) {
        return "Hello World";
    }

}
