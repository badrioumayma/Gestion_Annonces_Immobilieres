package com.agence.business.service;

import org.springframework.web.multipart.MultipartFile;

import com.agence.dao.entities.Property;
import com.agence.dao.entities.PropertyStatus;
import com.agence.dao.entities.PropertyType;

import java.util.List;

public interface PropertyService {
    List<Property> getAllProperties();
    Property getPropertyById(Long id);
    Property createProperty(Property property);
    Property updateProperty(Long id, Property propertyDetails);
    void deleteProperty(Long id);
    List<Property> searchProperties(PropertyType type, PropertyStatus status, String ville,
                                  Double prixMin, Double prixMax, Integer chambres);
    Property uploadImage(Long id, MultipartFile file);
} 