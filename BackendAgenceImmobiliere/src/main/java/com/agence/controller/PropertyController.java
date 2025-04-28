package com.agence.controller;

import com.agence.entity.Property;
import com.agence.entity.PropertyStatus;
import com.agence.entity.PropertyType;
import com.agence.service.PropertyService;
import com.agence.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:4200")
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        try {
            Property property = propertyService.getPropertyById(id);
            return ResponseEntity.ok(property);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Property> createPropertyWithImage(
            @RequestPart("property") Property property,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        Property savedProperty = propertyService.createProperty(property);
        if (file != null && !file.isEmpty()) {
            savedProperty = propertyService.uploadImage(savedProperty.getId(), file);
        }
        return ResponseEntity.ok(savedProperty);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property property) {
        try {
            Property updatedProperty = propertyService.updateProperty(id, property);
            return ResponseEntity.ok(updatedProperty);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        try {
            propertyService.deleteProperty(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/images")
    public ResponseEntity<Property> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            Property property = propertyService.uploadImage(id, file);
            return ResponseEntity.ok(property);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/search")
    public List<Property> searchProperties(@RequestParam Map<String, String> filters) {
        PropertyType type = filters.containsKey("type") ? PropertyType.valueOf(filters.get("type")) : null;
        PropertyStatus status = filters.containsKey("status") ? PropertyStatus.valueOf(filters.get("status")) : null;
        String city = filters.get("city");
        Double minPrice = filters.containsKey("minPrice") ? Double.parseDouble(filters.get("minPrice")) : null;
        Double maxPrice = filters.containsKey("maxPrice") ? Double.parseDouble(filters.get("maxPrice")) : null;
        Integer bedrooms = filters.containsKey("bedrooms") ? Integer.parseInt(filters.get("bedrooms")) : null;

        return propertyService.searchProperties(type, status, city, minPrice, maxPrice, bedrooms);
    }
} 