package com.agence.service.impl;

import com.agence.entity.Property;
import com.agence.entity.PropertyStatus;
import com.agence.entity.PropertyType;
import com.agence.repository.PropertyRepository;
import com.agence.service.PropertyService;
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
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + id));
    }

    @Override
    public Property createProperty(Property property) {
        if (property.getStatut() == null) {
            property.setStatut(PropertyStatus.DISPONIBLE);
        }
        return propertyRepository.save(property);
    }

    @Override
    public Property updateProperty(Long id, Property propertyDetails) {
        Optional<Property> optionalProperty = propertyRepository.findById(id);
        if (optionalProperty.isPresent()) {
            Property property = optionalProperty.get();
            property.setTitre(propertyDetails.getTitre());
            property.setDescription(propertyDetails.getDescription());
            property.setPrix(propertyDetails.getPrix());
            property.setAdresse(propertyDetails.getAdresse());
            property.setVille(propertyDetails.getVille());
            property.setPays(propertyDetails.getPays());
            property.setChambres(propertyDetails.getChambres());
            property.setSallesDeBain(propertyDetails.getSallesDeBain());
            property.setSurface(propertyDetails.getSurface());
            property.setPieces(propertyDetails.getPieces());
            property.setType(propertyDetails.getType());
            property.setStatut(propertyDetails.getStatut());
            property.setLocalisation(propertyDetails.getLocalisation());
            property.setImages(propertyDetails.getImages());
            return propertyRepository.save(property);
        }
        throw new RuntimeException("Property not found with id: " + id);
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