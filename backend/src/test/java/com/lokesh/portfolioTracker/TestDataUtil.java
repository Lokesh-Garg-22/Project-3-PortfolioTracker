package com.lokesh.portfolioTracker;

import com.lokesh.portfolioTracker.domain.User;

public final class TestDataUtil {
    private TestDataUtil() {
    }

    public static User createTestUserA() {
        return User.builder()
                .id(1L)
                .name("A User Test")
                .username("a_usertest")
                .password("a_usertest")
                .build();
    }

    public static User createTestUserB() {
        return User.builder()
                .id(2L)
                .name("B User Test")
                .username("b_usertest")
                .password("b_usertest")
                .build();
    }

    public static User createTestUserC() {
        return User.builder()
                .id(3L)
                .name("C User Test")
                .username("c_usertest")
                .password("c_usertest")
                .build();
    }

}
