package com.lokesh.portfolioTracker.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.lokesh.portfolioTracker.TestDataUtil;
import com.lokesh.portfolioTracker.domain.entities.UserEntity;

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
        UserEntity user = TestDataUtil.createTestUserA();
        underTest.save(user);

        Optional<UserEntity> result = underTest.findById(user.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(user);
    }

    @Test
    @Transactional
    public void testThatMultipleUsersCanBeCreatedAndRecalled() {
        UserEntity userA = TestDataUtil.createTestUserA();
        underTest.save(userA);

        UserEntity userB = TestDataUtil.createTestUserB();
        underTest.save(userB);

        UserEntity userC = TestDataUtil.createTestUserC();
        underTest.save(userC);

        Iterable<UserEntity> result = underTest.findAll();
        assertThat(result)
                .hasSize(3)
                .containsExactly(userA, userB, userC);
    }

    @Test
    @Transactional
    public void testThatUserCanBeUpdated() {
        UserEntity userA = TestDataUtil.createTestUserA();
        underTest.save(userA);

        userA.setName("User A Updated");
        underTest.save(userA);
        Optional<UserEntity> result = underTest.findById(userA.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(userA);
    }

    @Test
    @Transactional
    public void testThatUserCanBeDeleted() {
        UserEntity userA = TestDataUtil.createTestUserA();
        underTest.save(userA);
        underTest.deleteById(userA.getId());
        Optional<UserEntity> result = underTest.findById(userA.getId());
        assertThat(result).isEmpty();
    }

}
