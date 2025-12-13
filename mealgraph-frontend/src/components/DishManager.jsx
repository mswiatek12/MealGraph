// src/components/DishManager.jsx
import React, { useState, useEffect } from 'react';
import { StarIcon, ChevronDownIcon, ChevronUpIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import MealGraphService from '../services/MealGraphService.jsx';

const DishManager = ({ onSearch }) => {
    // --- Data State ---
    const [allIngredients, setAllIngredients] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    // --- UI State (Collapsible Sections) ---
    // false = collapsed (zwinięty) by default
    const [isDishFormOpen, setIsDishFormOpen] = useState(false);
    const [isIngredientFormOpen, setIsIngredientFormOpen] = useState(false);

    // --- Form States ---
    const [newDish, setNewDish] = useState({
        name: '',
        difficulty: 1,
        timeMinutes: 0,
        cuisine: '',
        selectedIngredients: []
    });

    const [newIngredient, setNewIngredient] = useState({
        name: '',
        calories: 0,
        isAllergen: false
    });

    // --- Init: Load Ingredients for Dropdown ---
    useEffect(() => {
        loadIngredients();
    }, []);

    const loadIngredients = async () => {
        try {
            // Ensure MealGraphService has getAllIngredients() method
            const res = await MealGraphService.getAllIngredients();
            setAllIngredients(res.data);
        } catch (e) {
            console.error("Failed to load ingredients. Check MealGraphService and Backend.");
        }
    };

    // --- Handler: Add New Ingredient ---
    const handleAddIngredient = async (e) => {
        e.preventDefault();
        try {
            await MealGraphService.addIngredient(newIngredient);
            alert("Ingredient Added!");
            setNewIngredient({ name: '', calories: 0, isAllergen: false });
            loadIngredients(); // Refresh the dropdown list immediately
            setIsIngredientFormOpen(false); // Close form after success
        } catch (error) {
            console.error(error);
            alert("Failed to add ingredient");
        }
    };

    // --- Handler: Add New Dish ---
    const handleDishInputChange = (e) => {
        const { name, value } = e.target;
        setNewDish({ ...newDish, [name]: value });
    };

    const handleIngredientSelect = (e) => {
        // Handle multi-select logic
        const options = e.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setNewDish({ ...newDish, selectedIngredients: selected });
    };

    const handleAddDish = async (e) => {
        e.preventDefault();

        // Prepare data for backend
        const cuisineObjs = newDish.cuisine.split(',').map(c => ({ name: c.trim() }));
        const ingredientObjs = newDish.selectedIngredients.map(name => ({ name: name }));

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
            setNewDish({ name: '', difficulty: 1, timeMinutes: 0, cuisine: '', selectedIngredients: [] });
            setIsDishFormOpen(false); // Close form (zwiń) after success
        } catch (error) {
            console.error("Error adding dish", error);
            alert("Failed to add dish");
        }
    };

    // --- Handlers: Search & Delete ---
    const [searchType, setSearchType] = useState('name');
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (searchType === 'name') response = await MealGraphService.getDishByName(searchValue);
            else if (searchType === 'cuisine') response = await MealGraphService.getDishByCuisine(searchValue);
            else if (searchType === 'difficulty') response = await MealGraphService.getDishByDifficulty(parseInt(searchValue));

            setSearchResults(response.data);
            if (onSearch) onSearch(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (dishName) => {
        if(!window.confirm(`Delete ${dishName}?`)) return;
        try {
            await MealGraphService.deleteDish({ name: dishName });
            const updated = searchResults.filter(d => d.name !== dishName);
            setSearchResults(updated);
            if(onSearch) onSearch(updated);
        } catch(e) { console.error(e); }
    };

    return (
        <div className="container mt-4">

            {/* 1. TOP ROW: Search & Add Ingredient Button */}
            <div className="row mb-3">
                <div className="col-md-8">
                    <div className="card p-3 shadow-sm">
                        <form onSubmit={handleSearch} className="d-flex gap-2">
                            <select className="form-select w-auto" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                                <option value="name">Name</option>
                                <option value="cuisine">Cuisine</option>
                                <option value="difficulty">Difficulty</option>
                            </select>
                            <input className="form-control" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-4">
                    <button
                        className={`btn w-100 h-100 d-flex align-items-center justify-content-center gap-2 ${isIngredientFormOpen ? 'btn-secondary' : 'btn-outline-success'}`}
                        onClick={() => setIsIngredientFormOpen(!isIngredientFormOpen)}
                    >
                        <PlusCircleIcon width={24}/> {isIngredientFormOpen ? 'Close Ingredient Form' : 'Create New Ingredient'}
                    </button>
                </div>
            </div>

            {/* 2. COLLAPSIBLE: Create Ingredient Form */}
            {isIngredientFormOpen && (
                <div className="card p-3 mb-4 border-success shadow-sm">
                    <h5 className="text-success border-bottom pb-2">New Ingredient Details</h5>
                    <form onSubmit={handleAddIngredient} className="row g-3 mt-1">
                        <div className="col-md-6">
                            <label className="form-label">Ingredient Name</label>
                            <input className="form-control" value={newIngredient.name} onChange={e => setNewIngredient({...newIngredient, name: e.target.value})} required />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Calories</label>
                            <input type="number" className="form-control" value={newIngredient.calories} onChange={e => setNewIngredient({...newIngredient, calories: e.target.value})} />
                        </div>
                        <div className="col-md-3 d-flex align-items-end">
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" id="allergen" checked={newIngredient.isAllergen} onChange={e => setNewIngredient({...newIngredient, isAllergen: e.target.checked})} />
                                <label className="form-check-label" htmlFor="allergen">Is Allergen?</label>
                            </div>
                        </div>
                        <div className="col-12 text-end">
                            <button type="submit" className="btn btn-success">Save Ingredient</button>
                        </div>
                    </form>
                </div>
            )}

            {/* 3. COLLAPSIBLE (ZWIJANA): Add Dish Form */}
            <div className="card mb-4 border-primary shadow-sm">
                <div
                    className="card-header bg-primary text-white d-flex justify-content-between align-items-center"
                    style={{cursor: 'pointer'}}
                    onClick={() => setIsDishFormOpen(!isDishFormOpen)}
                >
                    <h5 className="m-0 d-flex align-items-center gap-2">
                        <PlusCircleIcon width={24}/> Add New Dish
                    </h5>
                    {/* The Icon changes based on state to indicate collapse/expand */}
                    {isDishFormOpen ? <ChevronUpIcon width={24}/> : <ChevronDownIcon width={24}/>}
                </div>

                {isDishFormOpen && (
                    <div className="card-body">
                        <form onSubmit={handleAddDish}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Dish Name</label>
                                    <input name="name" className="form-control" value={newDish.name} onChange={handleDishInputChange} required />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label className="form-label">Difficulty (1-5)</label>
                                    <input name="difficulty" type="number" min="1" max="5" className="form-control" value={newDish.difficulty} onChange={handleDishInputChange} />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label className="form-label">Time (min)</label>
                                    <input name="timeMinutes" type="number" className="form-control" value={newDish.timeMinutes} onChange={handleDishInputChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Cuisines (comma separated)</label>
                                    <input name="cuisine" className="form-control" value={newDish.cuisine} onChange={handleDishInputChange} placeholder="Italian, Pasta" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Select Ingredients (Hold Ctrl/Cmd to select multiple)</label>
                                    <select multiple className="form-select" size="5" onChange={handleIngredientSelect} value={newDish.selectedIngredients}>
                                        {allIngredients.length === 0 && <option disabled>No ingredients found. Add one above!</option>}
                                        {allIngredients.map(ing => (
                                            <option key={ing.name} value={ing.name}>
                                                {ing.name} ({ing.calories} cal)
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Create Dish Node</button>
                        </form>
                    </div>
                )}
            </div>

            {/* 4. Results List */}
            <div className="row">
                {searchResults.map((dish) => (
                    <div className="col-md-4 mb-3" key={dish.name}>
                        <div className="card h-100 shadow-sm hover-effect">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <h5 className="card-title text-primary">{dish.name}</h5>
                                    <span className="badge bg-secondary">{dish.timeMinutes}m</span>
                                </div>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {[...Array(dish.difficulty || 0)].map((_, i) => <StarIcon key={i} style={{width:16, display:'inline', color:'gold'}} />)}
                                </h6>
                                <hr/>
                                <p className="card-text small">
                                    <strong>Cuisines:</strong> {dish.cuisine?.map(c => c.name).join(', ') || 'None'}<br/>
                                    <strong>Ingredients:</strong> {dish.ingredients?.map(i => i.name).join(', ') || 'None'}
                                </p>
                                <button className="btn btn-outline-danger btn-sm w-100" onClick={() => handleDelete(dish.name)}>Delete Dish</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DishManager;