package com.lokesh.portfolioTracker.dao.impl;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.jdbc.core.JdbcTemplate;

import com.lokesh.portfolioTracker.TestDataUtil;
import com.lokesh.portfolioTracker.domain.User;

@ExtendWith(MockitoExtension.class)
public class UserDaoImplTests {

    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private UserDaoImpl underTest;

    @Test
    public void testThatCreateAuthorGeneratesCorrectSQL() {
        User user = TestDataUtil.createTestUserA();
        underTest.create(user);

        verify(jdbcTemplate).update(
                eq("INSERT INTO users (id, name, username, password) VALUES (?, ?, ?, ?)"),
                eq(user.getId()), eq(user.getName()), eq(user.getUsername()), eq(user.getPassword()));
    }

    @Test
    public void testThatFindOneGeneratesCorrectSQL() {
        underTest.findOne(1L);
        verify(jdbcTemplate).query(
                eq("SELECT id, name, username, password FROM users WHERE id = ? LIMIT 1"),
                ArgumentMatchers.<UserDaoImpl.UserRowMapper>any(),
                eq(1L));
    }

    @Test
    public void testThatFindManyGeneratesCorrectSQL() {
        underTest.find();
        verify(jdbcTemplate).query(
                eq("SELECT id, name, username, password FROM users"),
                ArgumentMatchers.<UserDaoImpl.UserRowMapper>any());
    }
}
