package com.example.petshop_web.repository;

import com.example.petshop_web.entity.SmartBill;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillsmartRP extends JpaRepository<SmartBill, Long> {

    @Query("""
    SELECT 
    FUNCTION('TO_CHAR', s.billDateSmart, 'YYYY-MM') AS month,
    SUM(s.billTotalSmart) AS total
    FROM SmartBill s
    GROUP BY FUNCTION('TO_CHAR', s.billDateSmart, 'YYYY-MM')
    ORDER BY month ASC
""")

List<Object[]> getTotalMonthlyRevenueSmart();
     

    
}

