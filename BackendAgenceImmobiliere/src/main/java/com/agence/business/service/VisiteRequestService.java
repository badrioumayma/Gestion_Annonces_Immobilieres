package com.agence.business.service;

import com.agence.dao.entities.VisiteRequest;
import com.agence.dao.entities.VisiteRequestStatus;
import java.util.List;
import java.util.Map;

public interface VisiteRequestService {
    List<Map<String, Object>> getAllVisiteRequests();
    Map<String, Object> getVisiteRequestById(Long id);
    VisiteRequest createVisiteRequest(VisiteRequest visiteRequest);
    VisiteRequest updateVisiteRequestStatus(Long id, VisiteRequestStatus status);
    void deleteVisiteRequest(Long id);
    String getPropertyTitle(Long propertyId);
} 