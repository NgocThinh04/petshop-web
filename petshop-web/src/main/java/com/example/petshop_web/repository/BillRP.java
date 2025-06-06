package com.example.petshop_web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.petshop_web.entity.*;

@Repository
public interface BillRP extends JpaRepository<Bill, Long> {
}
