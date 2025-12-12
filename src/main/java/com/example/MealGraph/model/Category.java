package com.example.MealGraph.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;


@Node("Category")
@Getter
@Setter
public class Category {

    @Id
    public String name;

    public Category(String name) {
        this.name = name;
    }

    public Category() { }
}
