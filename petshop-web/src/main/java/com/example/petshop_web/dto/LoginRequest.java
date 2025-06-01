package com.example.petshop_web.dto;

//Nhận data từ fe
public class LoginRequest {
    private String username;
    private String password;

    public String getUserName() {
        return username;
    }

    public String getPw() {
        return password;
    }

    public void setUserName(String username) {
        this.username = username;
    }

    public void setPw(String pw) {
        this.password = pw;
    }
}
