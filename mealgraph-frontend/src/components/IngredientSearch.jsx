// src/components/IngredientSearch.jsx
import React, { useState } from 'react';
import MealGraphService from '../services/MealGraphService.jsx';

const IngredientSearch = () => {
    const [ingredients, setIngredients] = useState([]);

    const fetchSafeIngredients = async () => {
        try {
            const res = await MealGraphService.getIngredientSafe();
            setIngredients(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchByCalories = async (calories) => {
        if (!calories) return;
        try {
            const res = await MealGraphService.getIngredientByCalories(calories);
            setIngredients(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Ingredient Finder</h2>
            <div className="btn-group mb-3">
                <button className="btn btn-outline-success" onClick={fetchSafeIngredients}>Find Safe (Non-Allergen)</button>
                <button className="btn btn-outline-warning" onClick={() => fetchByCalories(100)}>Find Low Calorie (&lt;100)</button>
            </div>

            <ul className="list-group">
                {ingredients.map(ing => (
                    <li key={ing.name} className="list-group-item d-flex justify-content-between align-items-center">
                        {ing.name}
                        <span className="badge bg-primary rounded-pill">{ing.calories} cal</span>
                        {ing.isAllergen && <span className="badge bg-danger ms-2">Allergen</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IngredientSearch;