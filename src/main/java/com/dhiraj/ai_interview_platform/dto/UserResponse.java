package com.dhiraj.ai_interview_platform.dto;

public class UserResponse {

    private Integer userId;
    private String name;
    private String email;

    public UserResponse(Integer userId, String name, String email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}