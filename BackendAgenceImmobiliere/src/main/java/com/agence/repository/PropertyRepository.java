package com.agence.repository;

import com.agence.entity.Property;
import com.agence.entity.PropertyStatus;
import com.agence.entity.PropertyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByType(PropertyType type);
    List<Property> findByStatut(PropertyStatus status);
    List<Property> findByVille(String ville);
    List<Property> findByPrixBetween(Double prixMin, Double prixMax);
    List<Property> findByChambres(Integer chambres);
    List<Property> findBySallesDeBain(Integer sallesDeBain);
} 