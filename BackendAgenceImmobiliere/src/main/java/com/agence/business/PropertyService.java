package com.agence.business;

import com.agence.dao.entities.Property;
import com.agence.dao.entities.PropertyType;
import com.agence.dao.entities.PropertyStatus;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface PropertyService {
    List<Property> getAllProperties();
    Property getPropertyById(Long id);
    Property saveProperty(Property property);
    Property updateProperty(Property property);
    void deleteProperty(Long id);
    List<Property> searchProperties(PropertyType type, PropertyStatus status, String ville,
                                  Double prixMin, Double prixMax, Integer chambres);
    Property uploadImage(Long id, MultipartFile file);
} 