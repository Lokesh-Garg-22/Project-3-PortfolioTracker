package com.lokesh.portfolioTracker.controllers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lokesh.portfolioTracker.TestDataUtil;
import com.lokesh.portfolioTracker.domain.entities.UserEntity;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@AutoConfigureMockMvc
public class UserControllerIntegrationTests {

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @Autowired
    public UserControllerIntegrationTests(MockMvc mockMvc, ObjectMapper objectMapper) {
        this.mockMvc = mockMvc;
        this.objectMapper = objectMapper;
    }

    @Test
    public void testThatCreateUserSuccessfullyReturnedHttp201Created() throws Exception {
        UserEntity testUserA = TestDataUtil.createTestUserA();
        testUserA.setId(null);
        String userJson = objectMapper.writeValueAsString(testUserA);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    public void testThatCreateUserSuccessfullyReturnsSavedUser() throws Exception {
        UserEntity testUserA = TestDataUtil.createTestUserA();
        testUserA.setId(null);
        String userJson = objectMapper.writeValueAsString(testUserA);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(
                        MockMvcResultMatchers.jsonPath("$.id").isNumber())
                .andExpect(
                        MockMvcResultMatchers.jsonPath("$.name").value(testUserA.getName()))
                .andExpect(
                        MockMvcResultMatchers.jsonPath("$.username")
                                .value(testUserA.getUsername()))
                .andExpect(
                        MockMvcResultMatchers.jsonPath("$.password")
                                .value(testUserA.getPassword()));
    }

}
