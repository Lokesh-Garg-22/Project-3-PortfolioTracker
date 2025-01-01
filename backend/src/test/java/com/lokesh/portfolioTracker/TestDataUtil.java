package com.lokesh.portfolioTracker;

import com.lokesh.portfolioTracker.domain.entities.UserEntity;

public final class TestDataUtil {
    private TestDataUtil() {
    }

    public static UserEntity createTestUserA() {
        return UserEntity.builder()
                // .id(1L)
                .name("A User Test")
                .username("a_usertest")
                .password("a_usertest")
                .build();
    }

    public static UserEntity createTestUserB() {
        return UserEntity.builder()
                // .id(2L)
                .name("B User Test")
                .username("b_usertest")
                .password("b_usertest")
                .build();
    }

    public static UserEntity createTestUserC() {
        return UserEntity.builder()
                // .id(3L)
                .name("C User Test")
                .username("c_usertest")
                .password("c_usertest")
                .build();
    }

}
