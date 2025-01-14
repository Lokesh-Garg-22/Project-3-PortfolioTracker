package com.lokesh.portfolioTracker.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.lokesh.portfolioTracker.domain.entities.UserEntity;
import com.lokesh.portfolioTracker.repositories.UserRepository;
import com.lokesh.portfolioTracker.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserEntity createUser(UserEntity userEntity) {
        return userRepository.save(userEntity);
    }

    @Override
    public boolean userExists(String username) {
        List<UserEntity> response = userRepository.findByUsername(username);
        if (response.isEmpty())
            return false;
        return true;
    }

    @Override
    public boolean userExists(Long id) {
        Optional<UserEntity> response = userRepository.findById(id);
        if (response.isEmpty())
            return false;
        return true;
    }

    @Override
    public UserEntity userLogin(UserEntity userEntity) {
        List<UserEntity> response = userRepository.findByUsername(userEntity.getUsername());
        if (response.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found!");
        UserEntity user = response.getFirst();
        if (!user.getPassword().equals(userEntity.getPassword()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Wrong Password!");
        return user;
    }

    @Override
    public UserEntity checkAuthentication(UserEntity userEntity) {
        Optional<UserEntity> response = userRepository.findById(userEntity.getId());
        if (response.isEmpty())
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User Not Found");
        UserEntity user = response.get();
        if (!user.getUsername().equals(userEntity.getUsername()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Wrong User Id!");
        if (!user.getPassword().equals(userEntity.getPassword()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Wrong Password!");
        return user;
    }
}
