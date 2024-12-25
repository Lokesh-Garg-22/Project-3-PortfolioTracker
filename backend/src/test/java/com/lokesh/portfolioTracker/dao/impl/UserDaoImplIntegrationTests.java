package com.lokesh.portfolioTracker.dao.impl;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.lokesh.portfolioTracker.TestDataUtil;
import com.lokesh.portfolioTracker.domain.User;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class UserDaoImplIntegrationTests {

    private UserDaoImpl underTest;

    @Autowired
    public UserDaoImplIntegrationTests(UserDaoImpl underTest) {
        this.underTest = underTest;
    }

    @Test
    public void testThatUserCanBeCreatedAndRecalled() {
        User user = TestDataUtil.createTestUserA();
        underTest.create(user);

        Optional<User> result = underTest.findOne(user.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(user);
    }

    @Test
    public void testThatMultipleUsersCanBeCreatedAndRecalled() {
        User userA = TestDataUtil.createTestUserA();
        underTest.create(userA);

        User userB = TestDataUtil.createTestUserB();
        underTest.create(userB);

        User userC = TestDataUtil.createTestUserC();
        underTest.create(userC);

        List<User> result = underTest.find();
        assertThat(result)
                .hasSize(3)
                .containsExactly(userA, userB, userC);
    }

    @Test
    public void testThatUserCanBeUpdated() {
        User userA = TestDataUtil.createTestUserA();
        underTest.create(userA);

        userA.setName("User A Updated");
        underTest.update(userA.getId(), userA);
        Optional<User> result = underTest.findOne(userA.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(userA);
    }

    @Test
    public void testThatUserCanBeDeleted() {
        User userA = TestDataUtil.createTestUserA();
        underTest.create(userA);
        underTest.delete(userA.getId());
        Optional<User> result = underTest.findOne(userA.getId());
        assertThat(result).isEmpty();
    }

}
