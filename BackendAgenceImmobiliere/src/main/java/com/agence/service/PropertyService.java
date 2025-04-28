package com.agence.service;

import com.agence.entity.Property;
import com.agence.entity.PropertyStatus;
import com.agence.entity.PropertyType;
import org.springframework.web.multipart.MultipartFile;

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