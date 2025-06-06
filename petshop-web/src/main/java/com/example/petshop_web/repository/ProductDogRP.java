package com.example.petshop_web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.petshop_web.entity.Product;

@Repository
public interface ProductDogRP extends JpaRepository<Product, Long> {
        @Query("SELECT d FROM Product d WHERE d.ClassifyUnder = 'thucancho' ")
        List<Product> getdogclasstifyunder();

        @Query("SELECT cs FROM Product cs WHERE cs.Classifyunder2 = :id")
        List<Product> getdogclasstifyunder2(@Param("id") String id);

        @Query("SELECT df FROM Product df WHERE df.Classify = 'D01' ")
        List<Product> getalldogpr();

        @Query("SELECT COUNT(cf) FROM Product cf WHERE cf.Classify = :classify")
        int countProductsByClassify(@Param("classify") String classify);
}
