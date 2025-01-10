package com.lokesh.portfolioTracker.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.lokesh.portfolioTracker.domain.dto.UserDto;
import com.lokesh.portfolioTracker.domain.entities.UserEntity;
import com.lokesh.portfolioTracker.mappers.Mapper;
import com.lokesh.portfolioTracker.services.UserService;

@RestController
public class UserController {

    private UserService userService;

    private Mapper<UserEntity, UserDto> userMapper;

    private UserController(UserService userService, Mapper<UserEntity, UserDto> userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping(path = "/users/signup")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto user) {
        UserEntity userEntity = userMapper.mapFrom(user);
        if (userService.userExists(userEntity.getUsername()))
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User Allready Exists!");
        UserEntity savedUserEntity = userService.createUser(userEntity);
        return new ResponseEntity<>(userMapper.mapTo(savedUserEntity), HttpStatus.CREATED);
    }

    @PostMapping(path = "/users/login")
    public UserDto loginUser(@RequestBody UserDto user) {
        UserEntity userEntity = userMapper.mapFrom(user);
        UserEntity loggedUserEntity = userService.userLogin(userEntity);
        return userMapper.mapTo(loggedUserEntity);
    }

}
