package com.lokesh.portfolioTracker.services;

import com.lokesh.portfolioTracker.domain.entities.UserEntity;

public interface UserService {

    UserEntity createUser(UserEntity userEntity);

    boolean userExists(String username);

    boolean userExists(Long id);

    UserEntity userLogin(UserEntity userEntity);

    UserEntity checkAuthentication(UserEntity userEntity);

}
