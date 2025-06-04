package com.example.petshop_web.controller;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.petshop_web.entity.Smart;
import com.example.petshop_web.entity.Smartdto;
import com.example.petshop_web.repository.SmartRP;
import com.example.petshop_web.service.ImageService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/smart")
public class SmartController {

    @Autowired
    SmartRP smartrp;

    Smart smart;

    ImageService test1 = new ImageService();

    // lay tat ca san pham thiet bi thong minh
    @GetMapping
    public List<Smart> getsmartpr() {
        return smartrp.findAll();
    }

    // lay all sp may an uong tu dong
    @GetMapping("/T01")
    public List<Smart> getfeedr() {
        return smartrp.getsmclasstiify1();
    }

    // lay all sp nha vay sinh
    @GetMapping("/T02")
    public List<Smart> getpettoilet() {
        return smartrp.getsmclasstiify2();
    }

    // xoa san pham cho thiet bi thong minh
    @DeleteMapping("/dlte")
    public void delete(@RequestParam Long id) {
        smartrp.deleteById(id);
    }

    // lay thong tin tung san pham thiet bi tm chi tiet
    @GetMapping("/{id}")
    public Smart getsanphamid(@PathVariable("id") Long id) {
        return smartrp.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với id = " + id));
    }

    // update thong tin tung san pham cho tbi thong minh (admin)
    @PutMapping(value = "/put/{id}", consumes = { "multipart/form-data" })
    public ResponseEntity<?> putMethodName(@PathVariable("id") Long id,
            @RequestPart(value = "image", required = false) MultipartFile file, @RequestPart("smart") String smartpr) {
        try {

            Optional<Smart> optionalsmart = smartrp.findById(id);
            if (optionalsmart.isPresent()) {

                ObjectMapper object1 = new ObjectMapper();
                Smartdto smartdtothaaydoi = object1.readValue(smartpr, Smartdto.class);
                Smart productchxthaydoi = optionalsmart.get();

                productchxthaydoi.setNameSmart(smartdtothaaydoi.getNameSmart());
                productchxthaydoi.setBrandSmart(smartdtothaaydoi.getBrandSmart());
                productchxthaydoi.setClassifySmart(smartdtothaaydoi.getClassifySmart());
                productchxthaydoi.setPriceSmart(smartdtothaaydoi.getPriceSmart());
                productchxthaydoi.setQuantitySmart(smartdtothaaydoi.getQuantitySmart());
                productchxthaydoi.setDescribeSmart(smartdtothaaydoi.getDescribeSmart());

                String anhupdate = smartdtothaaydoi.getImageproductSmart();
                if (file != null && !file.isEmpty()) {
                    anhupdate = test1.saveFile(file);
                }
                productchxthaydoi.setImageProductSmart(anhupdate);
                smartrp.save(productchxthaydoi);
            }
            return ResponseEntity.ok(Collections.singletonMap("message", "Đã thêm thành công"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", "Thêm thất bại: " + e.getMessage()));
        }
    }

    // them san pham thiet bi thong minh (admin)
    @PostMapping(value = "/postt", consumes = { "multipart/form-data" })
    public ResponseEntity<?> inssetcat(
            @RequestPart("image") MultipartFile file,
            @RequestPart("smart") String smartjson) {
        try {

            ObjectMapper object = new ObjectMapper();
            Smartdto smdto = object.readValue(smartjson, Smartdto.class);

            String imageUrl = test1.saveFile(file);

            Smart smart = new Smart();
            smart.setNameSmart(smdto.getNameSmart());
            smart.setBrandSmart(smdto.getBrandSmart());
            smart.setClassifySmart(smdto.getClassifySmart());
            smart.setPriceSmart(smdto.getPriceSmart());
            smart.setQuantitySmart(smdto.getQuantitySmart());
            smart.setDescribeSmart(smdto.getDescribeSmart());
            smart.setImageProductSmart(imageUrl);
            smartrp.save(smart);

            return ResponseEntity.ok(Collections.singletonMap("message", "Đã thêm thành công"));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", "Thêm thất bại: " + e.getMessage()));
        }
    }
}
