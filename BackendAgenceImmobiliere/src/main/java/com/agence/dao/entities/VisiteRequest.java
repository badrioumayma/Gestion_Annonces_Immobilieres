package com.agence.dao.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "visite_requests")
@Data
public class VisiteRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String telephone;

    @Column(name = "date_souhaitee", nullable = false)
    private LocalDateTime dateSouhaitee;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VisiteRequestStatus status = VisiteRequestStatus.EN_ATTENTE;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
} 