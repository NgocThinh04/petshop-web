package com.example.petshop_web.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.petshop_web.entity.*;

@Repository
public interface AdminRP extends JpaRepository<Admin, Long> {
    Optional<Admin> findByAdminName(String adminName);
}