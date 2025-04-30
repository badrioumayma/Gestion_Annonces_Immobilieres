package com.agence.dao.repositories;

import com.agence.dao.entities.Property;
import com.agence.dao.entities.PropertyStatus;
import com.agence.dao.entities.PropertyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByType(PropertyType type);
    List<Property> findByStatut(PropertyStatus status);
    List<Property> findByPrixBetween(Double prixMin, Double prixMax);
    List<Property> findByChambres(Integer chambres);
    List<Property> findBySallesDeBain(Integer sallesDeBain);
} 