package com.agence.web.controller;

import com.agence.business.service.VisiteRequestService;
import com.agence.dao.entities.VisiteRequest;
import com.agence.dao.entities.VisiteRequestStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/visite-requests")
@CrossOrigin(origins = "*")
public class VisiteRequestController {
    private static final Logger logger = LoggerFactory.getLogger(VisiteRequestController.class);

    @Autowired
    private VisiteRequestService visiteRequestService;

    @GetMapping("/visite_requests")
    public String testEndpoint() {
        logger.info("Test endpoint appelé");
        return "Le contrôleur fonctionne !";
    }

    @GetMapping
    public List<Map<String, Object>> getAllVisiteRequests() {
        logger.info("Récupération de toutes les demandes de visite");
        return visiteRequestService.getAllVisiteRequests();
    }

    @GetMapping("/{id}")
    public Map<String, Object> getVisiteRequestById(@PathVariable Long id) {
        logger.info("Récupération de la demande de visite avec l'ID: {}", id);
        return visiteRequestService.getVisiteRequestById(id);
    }

    @PostMapping
    public VisiteRequest createVisiteRequest(@RequestBody VisiteRequest visiteRequest) {
        logger.info("Création d'une nouvelle demande de visite");
        return visiteRequestService.createVisiteRequest(visiteRequest);
    }

    @PutMapping("/{id}/status")
    public VisiteRequest updateVisiteRequestStatus(
            @PathVariable Long id,
            @RequestParam VisiteRequestStatus status) {
        logger.info("Mise à jour du statut de la demande de visite ID: {} vers {}", id, status);
        return visiteRequestService.updateVisiteRequestStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void deleteVisiteRequest(@PathVariable Long id) {
        logger.info("Suppression de la demande de visite ID: {}", id);
        visiteRequestService.deleteVisiteRequest(id);
    }
} 