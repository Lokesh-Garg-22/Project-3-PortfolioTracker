package com.lokesh.portfolioTracker.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.lokesh.portfolioTracker.domain.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

}
