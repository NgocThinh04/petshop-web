package com.example.petshop_web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

import com.example.petshop_web.dto.LoginRequest;
import com.example.petshop_web.dto.LoginResponse;
import com.example.petshop_web.entity.*;
import com.example.petshop_web.repository.AdminRP;
import com.example.petshop_web.repository.UserRP;

import java.util.Optional;

@RestController
@RequestMapping("/api/home")
@CrossOrigin
public class HomeController {
    @Autowired
    private AdminRP adminRP;
    @Autowired
    private UserRP userRP;

    @PostMapping("/login")
    // Phản hồi bất kiểu dữ liệu nào
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
        String username = request.getUserName();
        String pw = request.getPw();

        // Check admin
        Optional<Admin> admincheck = adminRP.findByAdminName(username);
        if (admincheck.isPresent()) {
            Admin admin = admincheck.get();
            if (admin.getAdminPW().equals(pw)) {
                session.setAttribute("userId", admin.getIdAdmin());
                session.setAttribute("username", admin.getAdminName());
                session.setAttribute("role", "ADMIN");
                return ResponseEntity.ok(new LoginResponse("ADMIN", admin.getAdminName()));
            }
        }
        // Check user
        Optional<User> usercheck = userRP.findByuserName(username);
        if (usercheck.isPresent()) {
            User user = usercheck.get();
            if (user.getPW().equals(pw)) {
                session.setAttribute("userId", user.getId());
                session.setAttribute("username", user.getUserName());
                session.setAttribute("role", "USER");
                return ResponseEntity.ok(new LoginResponse("USER", user.getUserName()));
            }
        }
        // Check err
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai tài khoản hoặc mật khẩu");
    }
}
