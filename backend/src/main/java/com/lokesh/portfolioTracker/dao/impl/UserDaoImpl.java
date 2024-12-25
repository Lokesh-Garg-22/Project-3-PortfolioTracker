package com.lokesh.portfolioTracker.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.lokesh.portfolioTracker.dao.UserDao;
import com.lokesh.portfolioTracker.domain.User;

@Component
public class UserDaoImpl implements UserDao {

    private final JdbcTemplate jdbcTemplate;
    private final UserRowMapper userRowMapper = new UserRowMapper();

    public UserDaoImpl(final JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void create(User user) {
        jdbcTemplate.update(
                "INSERT INTO users (id, name, username, password) VALUES (?, ?, ?, ?)",
                user.getId(), user.getName(), user.getUsername(), user.getPassword());
    }

    @Override
    public Optional<User> findOne(long userId) {
        List<User> results = jdbcTemplate.query(
                "SELECT id, name, username, password FROM users WHERE id = ? LIMIT 1",
                userRowMapper, userId);
        return results.stream().findFirst();
    }

    public static class UserRowMapper implements RowMapper<User> {

        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            return User.builder()
                    .id(rs.getLong("id"))
                    .name(rs.getString("name"))
                    .username(rs.getString("username"))
                    .password(rs.getString("password"))
                    .build();
        }

    }

    @Override
    public List<User> find() {
        return jdbcTemplate.query(
                "SELECT id, name, username, password FROM users",
                userRowMapper);
    }

    @Override
    public void update(long id, User user) {
        jdbcTemplate.update(
                "UPDATE users SET id = ?, name = ?, username = ?, password = ? WHERE id = ?",
                user.getId(), user.getName(), user.getUsername(), user.getPassword(), id);
    }

    @Override
    public void delete(long id) {
        jdbcTemplate.update(
                "DELETE FROM users WHERE id = ?", id);
    }

}
