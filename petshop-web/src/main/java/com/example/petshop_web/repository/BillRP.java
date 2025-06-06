package com.example.petshop_web.repository;

import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.petshop_web.entity.*;

@Repository
public interface BillRP extends JpaRepository<Bill, Long> {
    @Query(value = """
            SELECT
                TO_CHAR(b.bill_date, 'YYYY-MM') AS month,
                p.classify AS type,
                SUM(b.bill_total) AS total
            FROM bill b
            JOIN product p ON b.idproduct = p.id_product
            WHERE p.classify IN ('D01', 'C01')
            GROUP BY TO_CHAR(b.bill_date, 'YYYY-MM'), p.classify
            ORDER BY month ASC
            """, nativeQuery = true)
    List<Object[]> getMonthlyRevenueByClassify();
}
