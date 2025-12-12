package com.example.MealGraph.repository;

import com.example.MealGraph.model.Cuisine;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CuisineRepository extends Neo4jRepository<Cuisine, String> { }
