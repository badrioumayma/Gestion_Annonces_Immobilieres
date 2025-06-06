package com.agence.dao.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.agence.dao.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
} 