package com.example.petshop_web.entity;

import java.time.ZonedDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "bill_smart")
public class SmartBill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_billsmart")
    private Long idBillSmart;

    @Column(name = "id_user", nullable = false)
    private Long idUser;

    @Column(name = "bill_totalsmart", nullable = false)
    private Integer billTotalSmart;

    @Column(name = "bill_datesmart", nullable = false)
    private ZonedDateTime billDateSmart;

    @ManyToOne
    @JoinColumn(name = "id_smart", referencedColumnName = "id_product") // giả sử `smart` là `product`
    private Product product;

    public SmartBill() {
    }

    public Long getIdBillSmart() {
        return idBillSmart;
    }

    public void setIdBillSmart(Long idBillSmart) {
        this.idBillSmart = idBillSmart;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Integer getBillTotalSmart() {
        return billTotalSmart;
    }

    public void setBillTotalSmart(Integer billTotalSmart) {
        this.billTotalSmart = billTotalSmart;
    }

    public ZonedDateTime getBillDateSmart() {
        return billDateSmart;
    }

    public void setBillDateSmart(ZonedDateTime billDateSmart) {
        this.billDateSmart = billDateSmart;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
