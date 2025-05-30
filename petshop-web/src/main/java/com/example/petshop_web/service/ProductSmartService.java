package com.example.petshop_web.service;

import com.example.petshop_web.repository.ProductSmartRP;
import com.example.petshop_web.entity.Smart; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductSmartService {

    @Autowired
    private ProductSmartRP productSmartRP;

    public List<Smart> getAllSmart() {
        return productSmartRP.findAll();
    }
}
