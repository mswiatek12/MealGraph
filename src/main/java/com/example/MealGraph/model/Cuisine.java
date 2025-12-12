package com.example.MealGraph.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;


@Node("Cuisine")
@Getter
@Setter
public class Cuisine {

    @Id
    public String name;

    public Cuisine(String name) {
        this.name = name;
    }

    public Cuisine() { }
}
