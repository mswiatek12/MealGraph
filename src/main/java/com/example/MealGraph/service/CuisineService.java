package com.example.MealGraph.service;

import com.example.MealGraph.repository.CuisineRepository;
import org.springframework.stereotype.Service;

@Service
public class CuisineService {

    private CuisineRepository cuisineRepository;

    public CuisineService(CuisineRepository cuisineRepository) {
        this.cuisineRepository = cuisineRepository;
    }

}
