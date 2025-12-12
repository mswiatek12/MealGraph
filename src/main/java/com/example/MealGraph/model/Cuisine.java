package com.example.MealGraph.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.List;


@Node("Cuisine")
@Getter
@Setter
public class Cuisine {

    @Id
    public String name;

    @Relationship(type = "IS_CUISINE", direction = Relationship.Direction.INCOMING)
    private List<Dish> dish = new ArrayList<>();

    public Cuisine(String name) {
        this.name = name;
    }

    public Cuisine() { }
}
