// src/App.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DishManager from './components/DishManager';
import IngredientSearch from './components/IngredientSearch';
import GraphVisualizer from './components/GraphVisualizer'; // Import here

function App() {
    return (
        <div className="App">
            <nav className="navbar navbar-dark bg-dark mb-4">
                <div className="container">
                    <span className="navbar-brand mb-0 h1">MealGraph Application</span>
                </div>
            </nav>

            <div className="container">
                <div className="row">
                    <div className="col-12 mb-5">
                        <GraphVisualizer />
                    </div>

                    <div className="col-12 mb-5">
                        <DishManager />
                    </div>
                    <div className="col-12 border-top pt-4">
                        <IngredientSearch />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;