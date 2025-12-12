package com.example.MealGraph.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;


@Node("Ingredient")
@Getter
@Setter
public class Ingredient {

    @Id
    private String name;

    private Integer calories;

    private boolean isAllergen;

    @Relationship(type = "IS_CATEGORY",  direction = Relationship.Direction.OUTGOING)
    private List<Category> categories;

    public Ingredient(String name){
        this.name = name;
    }

    public Ingredient() { }
}
