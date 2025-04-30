package com.agence.business.impl;

import com.agence.business.service.VisiteRequestService;
import com.agence.dao.entities.VisiteRequest;
import com.agence.dao.entities.VisiteRequestStatus;
import com.agence.dao.repositories.VisiteRequestRepository;
import com.agence.dao.repositories.PropertyRepository;
import com.agence.web.exception.ResourceNotFoundException;
import com.agence.web.exception.BadRequestException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@Service
public class VisiteRequestServiceImpl implements VisiteRequestService {
    private static final Logger logger = LoggerFactory.getLogger(VisiteRequestServiceImpl.class);

    @Autowired
    private VisiteRequestRepository visiteRequestRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Override
    public List<Map<String, Object>> getAllVisiteRequests() {
        logger.info("Récupération de toutes les demandes de visite depuis le repository");
        List<VisiteRequest> requests = visiteRequestRepository.findAll();
        logger.info("Nombre total de demandes dans la base : {}", requests.size());
        
        return requests.stream()
                .map(this::convertToMap)
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getVisiteRequestById(Long id) {
        logger.info("Récupération de la demande de visite avec l'ID: {}", id);
        VisiteRequest request = visiteRequestRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Demande de visite non trouvée avec l'ID: " + id));
        return convertToMap(request);
    }

    @Override
    public VisiteRequest createVisiteRequest(VisiteRequest visiteRequest) {
        logger.info("Création d'une nouvelle demande de visite");
        if (visiteRequest.getProperty() == null || visiteRequest.getProperty().getId() == null) {
            throw new BadRequestException("La propriété est requise pour créer une demande de visite");
        }

        // Vérifier si la propriété existe
        propertyRepository.findById(visiteRequest.getProperty().getId())
            .orElseThrow(() -> new ResourceNotFoundException("Propriété non trouvée avec l'ID: " + visiteRequest.getProperty().getId()));

        VisiteRequest savedRequest = visiteRequestRepository.save(visiteRequest);
        logger.info("Demande de visite créée avec l'ID: {}", savedRequest.getId());
        return savedRequest;
    }

    @Override
    public VisiteRequest updateVisiteRequestStatus(Long id, VisiteRequestStatus status) {
        logger.info("Mise à jour du statut de la demande de visite ID: {} vers {}", id, status);
        return visiteRequestRepository.findById(id)
            .map(request -> {
                request.setStatus(status);
                VisiteRequest updatedRequest = visiteRequestRepository.save(request);
                logger.info("Statut de la demande de visite ID: {} mis à jour avec succès", id);
                return updatedRequest;
            })
            .orElseThrow(() -> new ResourceNotFoundException("Demande de visite non trouvée avec l'ID: " + id));
    }

    @Override
    public void deleteVisiteRequest(Long id) {
        logger.info("Suppression de la demande de visite ID: {}", id);
        if (!visiteRequestRepository.existsById(id)) {
            throw new ResourceNotFoundException("Demande de visite non trouvée avec l'ID: " + id);
        }
        visiteRequestRepository.deleteById(id);
        logger.info("Demande de visite ID: {} supprimée avec succès", id);
    }

    @Override
    public String getPropertyTitle(Long propertyId) {
        return propertyRepository.findById(propertyId)
                .map(property -> property.getTitre())
                .orElseThrow(() -> new ResourceNotFoundException("Propriété non trouvée avec l'ID: " + propertyId));
    }

    private Map<String, Object> convertToMap(VisiteRequest request) {
        String propertyTitle = getPropertyTitle(request.getProperty().getId());
        Map<String, Object> map = new HashMap<>();
        map.put("id", request.getId());
        map.put("propertyId", request.getProperty().getId());
        map.put("propertyTitle", propertyTitle);
        map.put("nom", request.getNom());
        map.put("email", request.getEmail());
        map.put("telephone", request.getTelephone());
        map.put("dateSouhaitee", request.getDateSouhaitee());
        map.put("message", request.getMessage());
        map.put("status", request.getStatus());
        map.put("createdAt", request.getCreatedAt());
        return map;
    }
} 