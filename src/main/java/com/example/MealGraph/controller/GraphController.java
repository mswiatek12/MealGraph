package com.example.MealGraph.controller;


import com.example.MealGraph.model.Dish;
import com.example.MealGraph.model.Ingredient;
import com.example.MealGraph.service.DishService;
import com.example.MealGraph.service.IngredientService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app")
public class GraphController {

    private DishService dishService;

    private IngredientService ingredientService;

    public GraphController(DishService dishService, IngredientService ingredientService) {
        this.dishService = dishService;
        this.ingredientService = ingredientService;
    }

    @GetMapping(value ="/dish", params = "name")
    public List<Dish> getDishByName(@RequestParam String name) {
        return dishService.findDishByName(name);
    }

    @GetMapping(value = "/dish", params = "cuisine")
    public List<Dish> getDishByCuisine(@RequestParam String cuisine) {
        return dishService.findDishByCuisine(cuisine);
    }

    @GetMapping(value = "/dish", params = "difficulty")
    public List<Dish> getDishByDifficulty(@RequestParam Integer difficulty) {
        return dishService.findDishByDifficulty(difficulty);
    }

    @GetMapping(value = "/ingredient", params = "name")
    public List<Ingredient> getIngredientByName(@RequestParam String name) {
        return ingredientService.findByName(name);
    }

    @GetMapping(value = "/ingredient", params = "category")
    public List<Ingredient> getIngredientByCategory(@RequestParam String category) {
        return ingredientService.findAllByCategoriesName(category);
    }



}
