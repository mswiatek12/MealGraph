// src/components/DishManager.jsx
import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import MealGraphService from '../services/MealGraphService.jsx';

// Accept onSearch prop
const DishManager = ({ onSearch }) => {
    const [searchType, setSearchType] = useState('name');
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [newDish, setNewDish] = useState({
        name: '',
        difficulty: 1,
        timeMinutes: 0,
        cuisine: '',
        ingredients: ''
    });

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

            if (onSearch) {
                onSearch(response.data);
            }

        } catch (error) {
            console.error("Error searching dishes", error);
            alert("Error searching dishes");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDish({ ...newDish, [name]: value });
    };

    const handleAddDish = async (e) => {
        e.preventDefault();

        const cuisineList = newDish.cuisine.split(',').map(c => ({wf: c.trim()})); // Typo in original file logic corrected in thought process, assuming backend handles {name: string}
        // Correcting object structure based on previous context:
        const cuisineObjs = newDish.cuisine.split(',').map(c => ({ name: c.trim() }));
        const ingredientObjs = newDish.ingredients.split(',').map(i => ({ name: i.trim() }));

        const dishPayload = {
            name: newDish.name,
            difficulty: parseInt(newDish.difficulty),
            timeMinutes: parseInt(newDish.timeMinutes),
            cuisine: cuisineObjs,
            ingredients: ingredientObjs
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
            await MealGraphService.deleteDish({ name: dishName });
            alert("Dish deleted");
            const updatedResults = searchResults.filter(d => d.name !== dishName);
            setSearchResults(updatedResults);
            if(onSearch) onSearch(updatedResults);
        } catch (error) {
            console.error("Error deleting dish", error);
        }
    }

    return (
        <div className="container mt-4">
            <h2>Dish Manager</h2>

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

            <div className="row mb-4">
                {searchResults.map((dish) => (
                    <div className="col-md-4 mb-3" key={dish.name}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{dish.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Difficulty: {dish.difficulty} | Time: {dish.timeMinutes}m</h6>
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

            <div className="card p-3">
                <h4>Add New Dish</h4>
                <form onSubmit={handleAddDish}>
                    <div className="mb-2">
                        <label>Name</label>
                        <input name="name" className="form-control" value={newDish.name} onChange={handleInputChange} required />
                    </div>
                    {/* ... other inputs ... */}
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