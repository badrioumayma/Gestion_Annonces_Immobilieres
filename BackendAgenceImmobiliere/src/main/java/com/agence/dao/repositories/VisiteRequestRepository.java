package com.agence.dao.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.agence.dao.entities.VisiteRequest;
import com.agence.dao.entities.VisiteRequestStatus;

import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VisiteRequestRepository extends JpaRepository<VisiteRequest, Long> {
    @Query("SELECT COUNT(v) FROM VisiteRequest v")
    long countAll();

    List<VisiteRequest> findByStatus(VisiteRequestStatus status);
    List<VisiteRequest> findByDateSouhaiteeBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<VisiteRequest> findByPropertyId(Long propertyId);
    List<VisiteRequest> findByEmail(String email);
    List<VisiteRequest> findByNomContainingIgnoreCase(String nom);
} 