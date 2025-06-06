package com.example.petshop_web.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.petshop_web.entity.User;

@Repository
public interface UserRP extends JpaRepository<User, Long> {
    Optional<User> findByuserName(String userName);
}
