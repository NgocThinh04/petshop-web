package com.example.petshop_web.controller;

import com.example.petshop_web.entity.Smart;
import com.example.petshop_web.service.ProductSmartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-smart")
public class ProductSmartController {

    @Autowired
    private ProductSmartService productSmartService;

    @GetMapping
    public List<Smart> getAllSmart() {
        return productSmartService.getAllSmart();
    }
}
