package com.example.petshop_web.entity;

import jakarta.persistence.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long Id;

    @Column(name = "user_name", nullable = false, length = 20)
    private String UserName;

    @Column(name = "name", nullable = false, length = 40)
    private String Name;

    @Column(name = "user_pw", nullable = false, length = 16)
    private String PW;

    @Column(name = "email", nullable = true)
    private String Email;

    @Column(name = "date_creat", nullable = false)
    private LocalDateTime DateCreat;

    public User() {
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String UserName) {
        this.UserName = UserName;
    }

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public String getPW() {
        return PW;
    }

    public void setPW(String PW) {
        this.PW = PW;
    }

    public String getMail() {
        return Email;
    }

    public void setEmail(String Email) {
        this.Email = Email;
    }

    public LocalDateTime getDataCreat() {
        return DateCreat;
    }
}
