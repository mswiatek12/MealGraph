package com.example.MealGraph.repository;

import com.example.MealGraph.model.Category;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CategoryRepository extends Neo4jRepository<Category, String> { }
