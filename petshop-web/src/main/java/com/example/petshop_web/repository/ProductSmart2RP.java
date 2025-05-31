package com.example.petshop_web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;

import com.example.petshop_web.entity.Smart;
import java.util.List;;

@Repository
public interface ProductSmart2RP extends JpaRepository<Smart, Long> {
    @Query("SELECT s FROM Smart s WHERE s.ClassifySmart = 'V'")
    List<Smart> searchByClassifyV();
}
