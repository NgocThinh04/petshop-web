package com.example.petshop_web.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.petshop_web.entity.Bill;
import com.example.petshop_web.repository.BillRP;

@RestController
@RequestMapping("/api/bill")
public class BillController {
    @Autowired
    private BillRP billRP;

    // @PostMapping("/addItem")
    // public ResponseEntity<String> addOrderItem(@RequestBody Bill bill) {
    // // bill.setBillDate(LocalDateTime.now());
    // // billRP.save(bill);
    // // return ResponseEntity.ok("Đã nhận đơn hàng:");
    // // }
    // // }
    // try {
    // bill.setBillDate(LocalDateTime.now());
    // billRP.save(bill);
    // return ResponseEntity.ok("");
    // } catch (Exception e) {
    // e.printStackTrace();
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    // .body("Lỗi server: " + e.getMessage());
    // }
    // }
    @PostMapping("/addItem")
    public ResponseEntity<String> addOrderItem(@RequestBody Bill bill) {
        System.out.println("===> Đã nhận đơn hàng từ client:");
        System.out.println(bill);

        try {
            bill.setBillDate(LocalDateTime.now());
            billRP.save(bill); // hoặc billRepository.save(bill)
            return ResponseEntity.ok("Đã nhận đơn hàng:");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi: " + e.getMessage());
        }
    }
}
