package com.example.MealGraph.repository;

import com.example.MealGraph.model.Category;
import com.example.MealGraph.model.Ingredient;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface IngredientRepository extends Neo4jRepository<Ingredient, String> {

    List<Ingredient> findByName(String name);

    List<Ingredient> findByCategoriesName(String categoryName);
}
