package com.example.petshop_web.entity;

import java.math.BigDecimal;

public class Smartdto {
    private String nameSmart;
    private BigDecimal priceSmart;
    private String brandSmart;
    private String classifySmart;
    private Integer quantitySmart;
    private String describeSmart;
    private String imageproductSmart;
    
    public Smartdto(){

    }

    public String getNameSmart() {
        return nameSmart;
    }

    public void setNameSmart(String NameSmart) {
        this.nameSmart = NameSmart;
    }

    public BigDecimal getPriceSmart() {
        return priceSmart;
    }

    public void setPriceSmart(BigDecimal PriceSmart) {
        this.priceSmart = PriceSmart;
    }

    public String getBrandSmart() {
        return brandSmart;
    }

    public void setBrandSmart(String BrandSmart) {
        this.brandSmart = BrandSmart;
    }

    public String getClassifySmart() {
        return classifySmart;
    }

    public void setClassifySmart(String ClassifySmart) {
        this.classifySmart = ClassifySmart;
    }

    public Integer getQuantitySmart() {
        return quantitySmart;
    }

    public void setQuantitySmart(Integer QuantitySmart) {
        this.quantitySmart = QuantitySmart;
    }
    
    public String getDescribeSmart(){
        return describeSmart;
    }
    
    public void setDescribeSmart(String DescribeSmart){
        this.describeSmart = DescribeSmart;
    }

    public String getImageproductSmart() {
        return imageproductSmart;
    }
    public void setImageproductSmart(String ImageproductSmart) {
        this.imageproductSmart =  ImageproductSmart;
    }
}
