package com.example.petshop_web.entity;

import java.math.BigDecimal;

public class Productdto {
    private String name;
    private BigDecimal price;
    private String brand;
    private String classify;
    private String describe;
    private Integer quantity;
    private String classifyUnder2;
    private String classifyUnder;
    private String imageproduct;

    public Productdto() {
    }

    public String getClassify() {
        return classify;
    }

    public void setClassify(String Classify) {
        this.classify = Classify;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String Describe) {
        this.describe = Describe;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer Quantity) {
        this.quantity = Quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal Price) {
        this.price = Price;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String Brand) {
        this.brand = Brand;
    }

    public String getName() {
        return name;
    }

    public void setName(String Name) {
        this.name = Name;
    }

    public String getClassifyUnder() {
        return classifyUnder;
    }

    public void setClassifyUnder(String ClassifyUnder) {
        this.classifyUnder = ClassifyUnder;
    }

    public String getClassifyUnder2() {
        return classifyUnder2;
    }

    public void setClassifyUnder2(String ClassifyUnder2) {
        this.classifyUnder2 = ClassifyUnder2;
    }

    public String getImageproduct() {
        return imageproduct;
    }

    public void setImageproduct(String Imageproduct) {
        this.imageproduct = Imageproduct;
    }

}
