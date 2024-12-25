package com.lokesh.portfolioTracker.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.lokesh.portfolioTracker.TestDataUtil;
import com.lokesh.portfolioTracker.domain.User;

import jakarta.transaction.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class UserRepositoryIntegrationTests {

    private UserRepository underTest;

    @Autowired
    public UserRepositoryIntegrationTests(UserRepository underTest) {
        this.underTest = underTest;
    }

    @Test
    @Transactional
    public void testThatUserCanBeCreatedAndRecalled() {
        User user = TestDataUtil.createTestUserA();
        underTest.save(user);

        Optional<User> result = underTest.findById(user.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(user);
    }

    @Test
    @Transactional
    public void testThatMultipleUsersCanBeCreatedAndRecalled() {
        User userA = TestDataUtil.createTestUserA();
        underTest.save(userA);

        User userB = TestDataUtil.createTestUserB();
        underTest.save(userB);

        User userC = TestDataUtil.createTestUserC();
        underTest.save(userC);

        Iterable<User> result = underTest.findAll();
        assertThat(result)
                .hasSize(3)
                .containsExactly(userA, userB, userC);
    }

    @Test
    @Transactional
    public void testThatUserCanBeUpdated() {
        User userA = TestDataUtil.createTestUserA();
        underTest.save(userA);

        userA.setName("User A Updated");
        underTest.save(userA);
        Optional<User> result = underTest.findById(userA.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(userA);
    }

    @Test
    @Transactional
    public void testThatUserCanBeDeleted() {
        User userA = TestDataUtil.createTestUserA();
        underTest.save(userA);
        underTest.deleteById(userA.getId());
        Optional<User> result = underTest.findById(userA.getId());
        assertThat(result).isEmpty();
    }

}
