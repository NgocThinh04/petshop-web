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

    @Column(name = "user_name", length = 20)
    private String userName;

    @Column(name = "name", length = 40)
    private String Name;

    @Column(name = "user_pw", length = 16)
    private String pw;

    @Column(name = "email")
    private String Email;

    @Column(name = "date_creat")
    private LocalDateTime dateCreat;

    public User() {
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public String getPW() {
        return pw;
    }

    public void setPW(String pw) {
        this.pw = pw;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String Email) {
        this.Email = Email;
    }

    public LocalDateTime getDateCreat() {
        return dateCreat;
    }

    public void setDateCreat(LocalDateTime dateCreat) {
        this.dateCreat = dateCreat;
    }
}
