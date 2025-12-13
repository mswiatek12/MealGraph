// src/components/DishManager.jsx
import React, { useState } from 'react';
import {StarIcon} from '@heroicons/react/24/solid'
import MealGraphService from '../services/MealGraphService.jsx';

const DishManager = () => {
    // Search State
    const [searchType, setSearchType] = useState('name');
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Form State
    const [newDish, setNewDish] = useState({
        name: '',
        difficulty: 1,
        timeMinutes: 0,
        cuisine: '', // Input as comma separated string for simplicity
        ingredients: '' // Input as comma separated string
    });

    // --- Search Handlers ---
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (searchType === 'name') {
                response = await MealGraphService.getDishByName(searchValue);
            } else if (searchType === 'cuisine') {
                response = await MealGraphService.getDishByCuisine(searchValue);
            } else if (searchType === 'difficulty') {
                response = await MealGraphService.getDishByDifficulty(parseInt(searchValue));
            }
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error searching dishes", error);
            alert("Error searching dishes");
        }
    };

    // --- Add Dish Handlers ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDish({ ...newDish, [name]: value });
    };

    const handleAddDish = async (e) => {
        e.preventDefault();

        // Convert comma-separated strings to Objects as expected by backend models
        const cuisineList = newDish.cuisine.split(',').map(c => ({ name: c.trim() }));
        const ingredientList = newDish.ingredients.split(',').map(i => ({ name: i.trim() }));

        const dishPayload = {
            name: newDish.name,
            difficulty: parseInt(newDish.difficulty),
            timeMinutes: parseInt(newDish.timeMinutes),
            cuisine: cuisineList,
            ingredients: ingredientList
        };

        try {
            await MealGraphService.addDish(dishPayload);
            alert("Dish added successfully!");
            setNewDish({ name: '', difficulty: 1, timeMinutes: 0, cuisine: '', ingredients: '' });
        } catch (error) {
            console.error("Error adding dish", error);
            alert("Failed to add dish");
        }
    };

    const handleDelete = async (dishName) => {
        if(!window.confirm(`Delete ${dishName}?`)) return;
        try {
            // The backend delete expects a Dish object body, usually an ID is preferred
            // We construct a minimal object with the ID (name)
            await MealGraphService.deleteDish({ name: dishName });
            alert("Dish deleted");
            setSearchResults(searchResults.filter(d => d.name !== dishName));
        } catch (error) {
            console.error("Error deleting dish", error);
        }
    }

    return (
        <div className="container mt-4">
            <h2>Dish Manager</h2>

            {/* Search Section */}
            <div className="card p-3 mb-4">
                <h4>Search Dishes</h4>
                <form onSubmit={handleSearch} className="d-flex gap-2">
                    <select className="form-select w-auto" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="cuisine">Cuisine</option>
                        <option value="difficulty">Difficulty</option>
                    </select>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search value..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit">Search</button>
                </form>
            </div>

            {/* Results List */}
            <div className="row mb-4">
                {searchResults.map((dish) => (
                    <div className="col-md-4 mb-3" key={dish.name}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{dish.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">  Difficulty:
                                    {[...Array(dish.difficulty)].map((_, i) => (
                                        <StarIcon key={i}
                                                    className="me-1 m-1"
                                                    width={16}
                                                    height={16}
                                                    color={'gold'}
                                        />
                                    ))} | Time: {dish.timeMinutes}m</h6>
                                <p className="card-text">
                                    <strong>Cuisines:</strong> {dish.cuisine.map(c => c.name).join(', ')}<br/>
                                    <strong>Ingredients:</strong> {dish.ingredients.map(i => i.name).join(', ')}
                                </p>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(dish.name)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Dish Section */}
            <div className="card p-3">
                <h4>Add New Dish</h4>
                <form onSubmit={handleAddDish}>
                    <div className="mb-2">
                        <label>Name</label>
                        <input name="name" className="form-control" value={newDish.name} onChange={handleInputChange} required />
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <label>Difficulty (1-5)</label>
                            <input name="difficulty" type="number" className="form-control" value={newDish.difficulty} onChange={handleInputChange} />
                        </div>
                        <div className="col">
                            <label>Time (Minutes)</label>
                            <input name="timeMinutes" type="number" className="form-control" value={newDish.timeMinutes} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label>Cuisines (comma separated)</label>
                        <input name="cuisine" className="form-control" value={newDish.cuisine} onChange={handleInputChange} placeholder="Italian, Pasta" />
                    </div>
                    <div className="mb-2">
                        <label>Ingredients (comma separated)</label>
                        <textarea name="ingredients" className="form-control" value={newDish.ingredients} onChange={handleInputChange} placeholder="Tomato, Salt, Basil" />
                    </div>
                    <button type="submit" className="btn btn-success">Add Dish</button>
                </form>
            </div>
        </div>
    );
};

export default DishManager;