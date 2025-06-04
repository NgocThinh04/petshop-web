package com.example.petshop_web.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.petshop_web.entity.Product;
import com.example.petshop_web.repository.ProductDogRP;

//controller api cho cho

@RestController
@RequestMapping("/api/dog")
public class DogController {
    
    @Autowired
    private ProductDogRP productdogrp;
    
    Product product;
    
    @GetMapping("/all")
    public List<Product> getalldog() {
        return productdogrp.getalldogpr();
    }
    // lay cac san pham phan loai 1 cho 
    @GetMapping
    public List<Product> getdogclasstifyunderr() {
        return productdogrp.getdogclasstifyunder();
    }

    //lay cac san pham phan loai 2 cho
    @GetMapping("/{id}")
    public List<Product> getdogclasstifyunderr2(@PathVariable("id") String id){
        return productdogrp.getdogclasstifyunder2(id);
    }
}