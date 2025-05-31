package com.example.petshop_web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.petshop_web.entity.User;

@Repository
public interface UserRP extends JpaRepository<User, Long> {

}
