package com.example.petshop_web.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product")
    private Long IdProduct;

    @Column(name = "classify", nullable = false, length = 30)
    private String Classify;

    @Column(name = "describe", nullable = true)
    private String Describe;

    @Column(name = "quantity", nullable = false)
    private Integer Quantity;

    @Column(name = "price", nullable = false)
    private BigDecimal Price;

    @Column(name = "brand", nullable = true, length = 30)
    private String Brand;

    @Column(name = "name", nullable = true, length = 40)
    private String Name;

    @Column(name = "classify_under", nullable = true, length = 40)
    private String ClassifyUnder;
    
    @Column(name = "classify_under2", nullable = true, length = 40)
    private String Classifyunder2;
    
    @Column(name = "image_product", nullable = true)
    private String Imageproduct;

    @Column(name = "date_add", nullable = false)
    @CreationTimestamp
    private LocalDateTime DateAdd;

    public Product() {
    }

    public Long getIdProduct() {
        return IdProduct;
    }

    public void setIdProduct(Long IdProduct) {
        this.IdProduct = IdProduct;
    }

    public String getClassify() {
        return Classify;
    }

    public void setClassify(String Classify) {
        this.Classify = Classify;
    }

    public String getDescribe() {
        return Describe;
    }

    public void setDescribe(String Describe) {
        this.Describe = Describe;
    }

    public Integer getQuantity() {
        return Quantity;
    }

    public void setQuantity(Integer Quantity) {
        this.Quantity = Quantity;
    }

    public BigDecimal getPrice() {
        return Price;
    }

    public void setPrice(BigDecimal Price) {
        this.Price = Price;
    }

    public String getBrand() {
        return Brand;
    }

    public void setBrand(String Brand) {
        this.Brand = Brand;
    }

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public String getClassifyUnder() {
        return ClassifyUnder;
    }

    public void setClassifyUnder(String ClassifyUnder) {
        this.ClassifyUnder = ClassifyUnder;
    }

    public String getClassifyUnder2() {
        return Classifyunder2;
    }

    public void setClassifyUnder2(String ClassifyUnder2) {
        this.Classifyunder2 = ClassifyUnder2;
    }


    public String getImageproduct() {
        return Imageproduct;
    }
    public void setImageproduct(String Imageproduct) {
        this.Imageproduct =  Imageproduct;
    }

    public LocalDateTime getDateAdd() {
        return DateAdd;
    }
}
