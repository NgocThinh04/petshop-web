package com.example.petshop_web.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.petshop_web.repository.UserRP;
import com.example.petshop_web.entity.*;

@Service
public class UserService {
    @Autowired
    private UserRP userRP;

    public List<User> getAllUser() {
        return userRP.findAll();
    }

    public void saveUser(User user) {
        userRP.save(user);
    }
}
