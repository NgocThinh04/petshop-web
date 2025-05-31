package com.example.petshop_web.service;

import java.util.concurrent.ConcurrentHashMap;
import java.time.LocalDateTime;
import java.util.*;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.petshop_web.entity.*;

@Service
public class OtpService {
    private Map<String, OtpUser> otpMap = new ConcurrentHashMap<>();

    @Autowired
    private JavaMailSender mail;

    public void sendOtp(String email) {
        String code = String.format("%06d", new Random().nextInt(999999));
        // Hiệu lực OTP
        LocalDateTime time = LocalDateTime.now().plusMinutes(1);

        otpMap.put(email, new OtpUser(code, time));

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Mã xác minh");
        message.setText("Mã OTP của bạn là:" + code + ". Có hiệu lực trong 1 phút.");
        mail.send(message);
    }

    public boolean restOtp(String email, String code) {
        // Lấy code theo email
        OtpUser otpUser = otpMap.get(email);
        if (otpUser == null)
            return false;
        // Check code
        boolean checkid = otpUser.getCode().equals(code) && otpUser.getTime().isAfter(LocalDateTime.now());
        if (checkid)
            otpMap.remove(email);
        return checkid;
    }
}
