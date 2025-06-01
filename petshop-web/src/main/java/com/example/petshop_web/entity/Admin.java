package com.example.petshop_web.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "admin")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_admin")
    private Long IdAdmin;

    @Column(name = "admin_name", nullable = false)
    private String adminName;

    @Column(name = "admin_pw", nullable = false)
    private String pw;

    public Admin() {
    }

    public void setIdAdmin(Long id) {
        this.IdAdmin = id;
    }

    public Long getIdAdmin() {
        return IdAdmin;
    }

    public void setAdminName(String adminname) {
        this.adminName = adminname;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminPW(String pw) {
        this.pw = pw;
    }

    public String getAdminPW() {
        return pw;
    }
}
