package com.example.petshop_web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "smart")
public class Smart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_smart")
    private Long IdSmart;

    @Column(name = "name_smart", nullable = true, length = 40)
    private String NameSmart;

    @Column(name = "price_smart", nullable = false)
    private BigDecimal PriceSmart;

    @Column(name = "brand_smart", nullable = true, length = 20)
    private String BrandSmart;

    @Column(name = "classify_smart", nullable = true, length = 20)
    private String ClassifySmart;

    @Column(name = "quantity_smart", nullable = false)
    private Integer QuantitySmart;

    @Column(name = "date_add_smart", nullable = false)
    private LocalDateTime DateAddSmart;

    public Smart() {
    }

    public Long getIdSmart() {
        return IdSmart;
    }

    public void setIdSmart(Long IdSmart) {
        this.IdSmart = IdSmart;
    }

    public String getNameSmart() {
        return NameSmart;
    }

    public void setNameSmart(String NameSmart) {
        this.NameSmart = NameSmart;
    }

    public BigDecimal getPriceSmart() {
        return PriceSmart;
    }

    public void setPriceSmart(BigDecimal PriceSmart) {
        this.PriceSmart = PriceSmart;
    }

    public String getBrandSmart() {
        return BrandSmart;
    }

    public void setBrandSmart(String BrandSmart) {
        this.BrandSmart = BrandSmart;
    }

    public String getClassifySmart() {
        return ClassifySmart;
    }

    public void setClassifySmart(String ClassifySmart) {
        this.ClassifySmart = ClassifySmart;
    }

    public Integer getQuantitySmart() {
        return QuantitySmart;
    }

    public void setQuantitySmart(Integer QuantitySmart) {
        this.QuantitySmart = QuantitySmart;
    }

    public LocalDateTime getDateAddSmart() {
        return DateAddSmart;
    }
}
