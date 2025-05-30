package com.example.petshop_web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.petshop_web.entity.Smart;

@Repository
public interface ProductSmartRP extends JpaRepository<Smart, Long> {
}