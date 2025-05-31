package com.example.petshop_web.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.petshop_web.service.OtpService;

@RestController
@RequestMapping("/api/otp")
public class OtpController {
    @Autowired
    private OtpService otpService;

    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@RequestBody Map<String, String> request) {
        otpService.sendOtp(request.get("email"));
        return ResponseEntity.ok("Đã gửi mã OTP");
    }

    @PostMapping("/rest")
    public ResponseEntity<String> restOtp(@RequestBody Map<String, String> request) {
        boolean value = otpService.restOtp(request.get("email"), request.get("code"));
        if (value) {
            return ResponseEntity.ok("Xác minh thành công.");
        } else {
            return ResponseEntity.badRequest().body("Mã OTP không hợp lệ hoặc đã hết hạn.");
        }
    }
}
