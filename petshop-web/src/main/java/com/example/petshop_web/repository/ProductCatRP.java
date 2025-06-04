package com.example.petshop_web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.petshop_web.entity.Product;


@Repository
public interface ProductCatRP extends JpaRepository<Product, Long> {
        @Query("SELECT c FROM Product c WHERE c.ClassifyUnder ='thucanmeo' ")
        List<Product> getcatclasstifyunder();

        @Query("SELECT cs FROM Product cs WHERE cs.Classifyunder2 = :id")
        List<Product>  getcatclasstifyunder2(@Param("id") String id);
        
        @Query("SELECT cf FROM Product cf WHERE cf.Classify ='C01' ")
        List<Product> getcatpr();

}


