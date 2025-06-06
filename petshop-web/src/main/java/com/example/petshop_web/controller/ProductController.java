package com.example.petshop_web.controller;

import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;

import com.example.petshop_web.entity.Product;
import com.example.petshop_web.entity.Productdto;
import com.example.petshop_web.repository.BillRP;
import com.example.petshop_web.repository.BillsmartRP;
import com.example.petshop_web.repository.ProductCatRP;
import com.example.petshop_web.repository.ProductDogRP;
import com.example.petshop_web.repository.SmartRP;
import com.example.petshop_web.repository.UserRP;
import com.example.petshop_web.service.ImageService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

//controller api chung cho ca cho va meo 

@RestController
@RequestMapping("/api/product")
public class ProductController {

    ImageService test1 = new ImageService();

    @Autowired
    private ProductCatRP productrp;

    @Autowired
    private ProductDogRP productdogrp;

    @Autowired
    private SmartRP smartrp;

    Product product;

    @Autowired
    private BillRP billRP;

    @Autowired
    private BillsmartRP billsmrp;

    @Autowired
    private UserRP userrp;

    // lay tat ca san pham cho va meo
    @GetMapping
    public List<Product> getallList() {
        return productrp.findAll();
    }

    // xoa san pham cho meo
    @DeleteMapping("/dlte")
    public void delete(@RequestParam Long id) {
        productrp.deleteById(id);
    }

    // lay thong tin tung san pham cho cho meo chi tiet
    @GetMapping("/{id}")
    public Product getsanphamid(@PathVariable("id") Long id) {
        return productrp.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với id = " + id));
    }

    // update thong tin tung san pham cho cho meo (admin)
    @PutMapping(value = "/put/{id}", consumes = { "multipart/form-data" })
    public ResponseEntity<?> putMethodName(@PathVariable("id") Long id,
            @RequestPart(value = "image", required = false) MultipartFile file,
            @RequestPart("product") String updateprdt) {
        try {

            Optional<Product> optionalProduct = productrp.findById(id);
            if (optionalProduct.isPresent()) {

                ObjectMapper object1 = new ObjectMapper();
                Productdto prdtothaydoi = object1.readValue(updateprdt, Productdto.class);
                Product productchxthaydoi = optionalProduct.get();

                productchxthaydoi.setName(prdtothaydoi.getName());
                productchxthaydoi.setBrand(prdtothaydoi.getBrand());
                productchxthaydoi.setClassify(prdtothaydoi.getClassify());
                productchxthaydoi.setClassifyUnder(prdtothaydoi.getClassifyUnder());
                productchxthaydoi.setClassifyUnder2(prdtothaydoi.getClassifyUnder2());
                productchxthaydoi.setDescribe(prdtothaydoi.getDescribe());
                productchxthaydoi.setPrice(prdtothaydoi.getPrice());
                productchxthaydoi.setQuantity(prdtothaydoi.getQuantity());

                String anhupdate = prdtothaydoi.getImageproduct();
                if (file != null && !file.isEmpty()) {
                    anhupdate = test1.saveFile(file);
                }
                productchxthaydoi.setImageproduct(anhupdate);

                productrp.save(productchxthaydoi);
            }
            return ResponseEntity.ok(Collections.singletonMap("message", "Đã thêm thành công"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", "Thêm thất bại: " + e.getMessage()));
        }
    }

    // them san pham cho cho meo (admin)
    @PostMapping(value = "/postt", consumes = { "multipart/form-data" })
    public ResponseEntity<?> inssetcat(
            @RequestPart("image") MultipartFile file,
            @RequestPart("product") String productJson) {
        try {
            ObjectMapper object = new ObjectMapper();
            Productdto prdto = object.readValue(productJson, Productdto.class);
            String imageUrl = test1.saveFile(file);
            prdto.setImageproduct(imageUrl);
            Product product = new Product();
            product.setImageproduct(imageUrl);
            product.setName(prdto.getName());
            product.setQuantity(prdto.getQuantity());
            product.setClassify(prdto.getClassify());
            product.setBrand(prdto.getBrand());
            product.setPrice(prdto.getPrice());
            product.setDescribe(prdto.getDescribe());
            product.setClassifyUnder(prdto.getClassifyUnder());
            product.setClassifyUnder2(prdto.getClassifyUnder2());
            productrp.save(product);

            return ResponseEntity.ok(Collections.singletonMap("message", "Đã thêm thành công"));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", "Thêm thất bại: " + e.getMessage()));
        }
    }

    @GetMapping("/keyword")
    public List<Product> search(@RequestParam String keyword) {
        return productrp.findByClassifyunder2Like(keyword);
    }

    @GetMapping("/admin")
    public Map<String, Integer> getThongKe() {
        Map<String, Integer> result = new HashMap<>();
        result.put("C01", productrp.countProductsByClassify("C01"));
        result.put("D01", productdogrp.countProductsByClassify("D01"));
        result.put("Smart", smartrp.getcountsm());
        result.put("User", (int) userrp.count());
        return result;
    }

    @GetMapping("/adminlinec")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyRevenueByClassify() {
        List<Map<String, Object>> response = new ArrayList<>();

        // Truy vấn từ bảng Bill (phân loại Chó, Mèo)
        List<Object[]> billData = billRP.getMonthlyRevenueByClassify();
        for (Object[] row : billData) {
            if (row.length < 3)
                continue; // tránh lỗi nếu thiếu dữ liệu

            Map<String, Object> map = new HashMap<>();
            map.put("month", row[0]); // YYYY-MM
            map.put("type", row[1]); // "Chó", "Mèo"
            map.put("total", row[2]); // Tổng doanh thu
            response.add(map);
        }

        // Truy vấn từ bảng Smart
        List<Object[]> smartData = billsmrp.getTotalMonthlyRevenueSmart(); // ví dụ trả về [month, total]
        for (Object[] row : smartData) {
            if (row.length < 2)
                continue; // tránh lỗi nếu thiếu dữ liệu

            Map<String, Object> map = new HashMap<>();
            map.put("month", row[0]); // YYYY-MM
            map.put("type", "Smart"); // Không có classify -> hardcode
            map.put("total", row[1]); // Chỉ có 2 cột: [month, total]
            response.add(map);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/quantity-summary")
    public ResponseEntity<Map<String, Integer>> getQuantitySummary() {
        List<Object[]> data = productrp.getQuantityByClassify();
        Integer smartQty = smartrp.getTotalSmartQuantity();

        Map<String, Integer> result = new HashMap<>();
        for (Object[] row : data) {
            result.put((String) row[0], ((Number) row[1]).intValue());
        }

        result.put("Smart", smartQty != null ? smartQty : 0);

        return ResponseEntity.ok(result);
    }
}
