package com.example.MealGraph.service;

import com.example.MealGraph.model.Ingredient;
import com.example.MealGraph.repository.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {

    private IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public List<Ingredient> findByName(String name) {
        return ingredientRepository.findByName(name);
    }

    public List<Ingredient> findAllByCategoriesName(String name) {
        return ingredientRepository.findByCategoriesName(name);
    }
}
