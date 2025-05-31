package com.example.petshop_web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.petshop_web.service.ProductHomeService;
import com.example.petshop_web.entity.*;

import java.util.List;

@RestController
@RequestMapping("/api/home")

public class HomeController {
    @Autowired
    private ProductHomeService productHomeService;

    @GetMapping
    public List<Product> getAllProduct() {
        return productHomeService.getAllProduct();
    }
}
