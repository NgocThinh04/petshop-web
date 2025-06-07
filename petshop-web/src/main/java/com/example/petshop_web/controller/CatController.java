package com.example.petshop_web.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.petshop_web.entity.Product;
import com.example.petshop_web.repository.ProductCatRP;

//controller api cho meo

@RestController
@RequestMapping("/api/cat")
public class CatController {
    
    @Autowired
    private ProductCatRP productcatrp;
    
    Product product;
    

    @GetMapping("/all")
    public List<Product> getallcat() {
        return productcatrp.getcatpr();
    }
    //lay cac san pham phan loai 1 meo
    @GetMapping
    public List<Product> getcatclasstifyunderr() {
        return productcatrp.getcatclasstifyunder();
    }
     
    //lay cac san pham phan loai 2 meo
    @GetMapping("/{id}")
    public List<Product> getcatclasstifyunderr2(@PathVariable("id") String id){
        return productcatrp.getcatclasstifyunder2(id);
    }

    

}