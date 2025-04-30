package com.agence.business.impl;

import com.agence.business.PropertyService;
import com.agence.dao.entities.Property;
import com.agence.dao.entities.PropertyStatus;
import com.agence.dao.entities.PropertyType;
import com.agence.dao.repositories.PropertyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyServiceImpl implements PropertyService {
    @Autowired
    private PropertyRepository propertyRepository;

    @Override
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    @Override
    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Propriété non trouvée"));
    }

    @Override
    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    @Override
    public Property updateProperty(Property property) {
        return propertyRepository.save(property);
    }

    @Override
    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }

    @Override
    public List<Property> searchProperties(PropertyType type, PropertyStatus status, String ville,
                                         Double prixMin, Double prixMax, Integer chambres) {
        return propertyRepository.findAll().stream()
                .filter(p -> type == null || p.getType() == type)
                .filter(p -> status == null || p.getStatut() == status)
                .filter(p -> ville == null || p.getVille().equalsIgnoreCase(ville))
                .filter(p -> prixMin == null || p.getPrix() >= prixMin)
                .filter(p -> prixMax == null || p.getPrix() <= prixMax)
                .filter(p -> chambres == null || p.getChambres() == chambres)
                .toList();
    }

    @Override
    public Property uploadImage(Long id, MultipartFile file) {
        Property property = getPropertyById(id);
        try {
            // Définir le dossier d'upload (à personnaliser si besoin)
            String uploadDir = System.getProperty("user.dir") + "/uploads";
            java.nio.file.Path uploadPath = java.nio.file.Paths.get(uploadDir).toAbsolutePath().normalize();
            java.nio.file.Files.createDirectories(uploadPath);

            // Générer un nom de fichier unique
            String originalFileName = org.springframework.util.StringUtils.cleanPath(file.getOriginalFilename());
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            String uniqueFileName = java.util.UUID.randomUUID().toString() + fileExtension;

            // Sauvegarder le fichier sur le serveur
            java.nio.file.Path targetLocation = uploadPath.resolve(uniqueFileName);
            java.nio.file.Files.copy(file.getInputStream(), targetLocation, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

            // Ajouter le chemin relatif à la liste des images
            java.util.List<String> images = property.getImages();
            if (images == null) {
                images = new java.util.ArrayList<>();
            }
            images.add("/uploads/" + uniqueFileName);
            property.setImages(images);

            // Sauvegarder la propriété mise à jour
            return propertyRepository.save(property);
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        }
    }
} 