package com.example.MealGraph.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.List;


@Node("Dish")
@Getter
@Setter
public class Dish {

    @Id
    private String name;

    private Integer difficulty;

    private Integer timeMinutes;

    @Relationship(type = "CONTAINS", direction = Relationship.Direction.OUTGOING)
    private List<Ingredient> ingredients = new ArrayList<>();

    @Relationship(type = "IS_CUISINE", direction = Relationship.Direction.OUTGOING)
    private List<Cuisine> cuisine = new ArrayList<>();

    public Dish(String name) {
        this.name = name;
    }

    public Dish() { }

}
