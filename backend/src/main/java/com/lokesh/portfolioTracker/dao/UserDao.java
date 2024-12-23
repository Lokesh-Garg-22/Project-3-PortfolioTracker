package com.lokesh.portfolioTracker.dao;

import java.util.List;
import java.util.Optional;

import com.lokesh.portfolioTracker.domain.User;

public interface UserDao {
    void create(User user);

    Optional<User> findOne(long userId);

    List<User> find();
}
