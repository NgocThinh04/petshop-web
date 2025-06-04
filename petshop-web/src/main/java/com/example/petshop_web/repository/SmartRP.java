package com.example.petshop_web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.petshop_web.entity.Smart;


@Repository
public interface SmartRP extends JpaRepository<Smart, Long> {

    @Query("SELECT sm FROM Smart sm WHERE sm.ClassifySmart = 'T01'")
    List<Smart> getsmclasstiify1();

    @Query("SELECT sm FROM Smart sm WHERE sm.ClassifySmart = 'T02'")
    List<Smart> getsmclasstiify2();
    

}
