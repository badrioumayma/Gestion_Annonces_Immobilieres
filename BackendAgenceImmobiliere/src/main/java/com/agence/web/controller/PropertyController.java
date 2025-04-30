package com.agence.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.agence.dao.entities.Property;
import com.agence.business.PropertyService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;
    
    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/properties")
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/properties/{id}")
    public Property getProperty(@PathVariable Long id) {
        return propertyService.getPropertyById(id);
    }

    @PostMapping(value = "/properties", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Property createProperty(@RequestBody Property property) {
        try {
            return propertyService.saveProperty(property);
        } catch (Exception e) {
            throw new RuntimeException("Error saving property: " + e.getMessage(), e);
        }
    }

    @PostMapping(value = "/properties/with-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Property createPropertyWithImage(
            @RequestPart("property") String propertyJson,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        try {
            Property property = objectMapper.readValue(propertyJson, Property.class);
            Property savedProperty = propertyService.saveProperty(property);

            if (file != null && !file.isEmpty()) {
                // Handle file upload if needed
                // You can implement file handling logic here
            }

            return savedProperty;
        } catch (Exception e) {
            throw new RuntimeException("Error processing property data: " + e.getMessage(), e);
        }
    }

    @PutMapping("/properties/{id}")
    public Property updateProperty(@PathVariable Long id, @RequestBody Property property) {
        property.setId(id);
        return propertyService.updateProperty(property);
    }

    @DeleteMapping("/properties/{id}")
    public void deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
    }
} 