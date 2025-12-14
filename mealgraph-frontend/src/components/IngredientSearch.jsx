import React, { useState } from 'react';
import MealGraphService from '../services/MealGraphService.jsx';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const IngredientSearch = () => {
    const [ingredients, setIngredients] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const fetchSafeIngredients = async () => {
        try {
            const res = await MealGraphService.getIngredientSafe();
            setIngredients(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchValue.trim()) return;

        try {
            const res = await MealGraphService.getIngredientByName(searchValue);
            setIngredients(res.data);
        } catch (err) {
            console.error(err);
            alert("Ingredient not found");
        }
    }

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
        <div className="container mt-4 mb-5">
            <h2>Ingredient Finder</h2>

            <div className="card p-3 mb-3 shadow-sm">
                <form onSubmit={handleSearch} className="d-flex gap-2">
                    <input
                        className="form-control"
                        placeholder="Search specific ingredient (e.g. Garlic)..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button className="btn btn-primary d-flex align-items-center gap-2" type="submit">
                        <MagnifyingGlassIcon width={20} /> Search
                    </button>
                </form>
            </div>

            <div className="d-flex gap-2 mb-3">
                <button className="btn btn-outline-success" onClick={fetchSafeIngredients}>Find Safe (Non-Allergen)</button>
                <button className="btn btn-outline-warning" onClick={() => fetchByCalories(100)}>Find Low Calorie (&lt;100)</button>
            </div>

            {ingredients.length > 0 ? (
                <ul className="list-group">
                    {ingredients.map((ing) => (
                        <li key={ing.name} className="list-group-item d-flex justify-content-between align-items-center">
                            <span className="fw-bold">{ing.name}</span>
                            <div>
                                <span className="badge bg-secondary rounded-pill me-2">{ing.calories} cal</span>
                                {ing.isAllergen ? (
                                    <span className="badge bg-danger">Allergen</span>
                                ) : (
                                    <span className="badge bg-success">Safe</span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-muted fst-italic mt-2">No ingredients to display. Try searching or using a filter.</div>
            )}
        </div>
    );
};

export default IngredientSearch;