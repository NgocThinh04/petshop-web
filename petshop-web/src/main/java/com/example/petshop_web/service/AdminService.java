package com.example.petshop_web.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.petshop_web.repository.AdminRP;
import com.example.petshop_web.entity.*;

@Service
public class AdminService {
    @Autowired
    private AdminRP adminRP;

    public List<Admin> getAdmin() {
        return adminRP.findAll();
    }
}
