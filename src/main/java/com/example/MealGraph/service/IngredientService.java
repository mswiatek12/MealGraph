package com.example.MealGraph.service;

import com.example.MealGraph.model.Ingredient;
import com.example.MealGraph.repository.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {

    private IngredientRepository ingredientRepository;

    public IngredientService(IngredientRepository ingredientRepository) { this.ingredientRepository = ingredientRepository; }

    public List<Ingredient> getAll() { return ingredientRepository.findAll(); }

    public List<Ingredient> findByNameContainingIgnoreCase(String name){ return ingredientRepository.findByName(name); }

    public List<Ingredient> findAllByCategoriesName(String name) { return ingredientRepository.findByCategoriesName(name); }

    public List<Ingredient> findByCaloriesLessThan(String calories) { return ingredientRepository.findByCaloriesLessThan(Integer.parseInt(calories)); }

    public List<Ingredient> findByIsAllergen(boolean isAllergen) { return ingredientRepository.findByIsAllergen(isAllergen); }

    public Ingredient addIngredient(Ingredient ingredient) { return ingredientRepository.save(ingredient); }
}
