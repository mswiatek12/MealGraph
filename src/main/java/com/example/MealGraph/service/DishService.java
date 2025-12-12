package com.example.MealGraph.service;

import com.example.MealGraph.model.Dish;
import com.example.MealGraph.repository.DishRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DishService {

    private DishRepository dishRepository;

    public DishService(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    public List<Dish> findDishByName(String name) {
        return dishRepository.findByName(name);
    }

    public List<Dish> findDishByCuisine(String cuisineName) {
        return dishRepository.findByCuisineName(cuisineName);
    }

    public List<Dish> findDishByDifficulty(Integer difficulty) {
        return dishRepository.findByDifficulty(difficulty);
    }

    public List<Dish> getDishByIngredient(List<String> ingredients) {
        return dishRepository.findByIngredients(ingredients);
    }

    public Dish addDish(Dish dish) {
        return dishRepository.save(dish);
    }

    public Dish updateDish(String name, Dish dishFromRequest) {
        return dishRepository.findById(name)
                .map(existingDish -> {
                    if(dishFromRequest.getDifficulty() != null) {
                        existingDish.setDifficulty(dishFromRequest.getDifficulty());
                    }
                    if(dishFromRequest.getTimeMinutes() != null) {
                        existingDish.setTimeMinutes(dishFromRequest.getTimeMinutes());
                    }
                    if(dishFromRequest.getIngredients() != null) {
                        existingDish.setIngredients(dishFromRequest.getIngredients());
                    }

                    return dishRepository.save(existingDish);
                })
                .orElse(null);
    }

    public void deleteDish(Dish dish) {
        dishRepository.deleteById(dish.getName());
    }

}
