package com.example.MealGraph.repository;

import com.example.MealGraph.model.Cuisine;
import com.example.MealGraph.model.Dish;
import org.springframework.stereotype.Repository;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.List;


@Repository
public interface DishRepository extends Neo4jRepository<Dish, String> {

   List<Dish> findByName(String name);

   List<Dish> findByCuisineName(String cuisineName);

   List<Dish> findByDifficulty(Integer difficulty);


}
