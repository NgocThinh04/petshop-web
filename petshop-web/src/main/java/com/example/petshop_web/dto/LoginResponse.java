package com.example.petshop_web.dto;

//Trả data về cho fe
public class LoginResponse {
    private String role;
    private String username;

    public LoginResponse(String role, String username) {
        this.role = role;
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public String getUserName() {
        return username;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setUserName(String username) {
        this.username = username;
    }
}
