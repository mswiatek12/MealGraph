// src/App.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DishManager from './components/DishManager';
import IngredientSearch from './components/IngredientSearch';
import GraphVisualizer from './components/GraphVisualizer';

function App() {
    const [graphDishes, setGraphDishes] = useState([]);

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
                        {/* Pass the search results to the Visualizer */}
                        <GraphVisualizer dishes={graphDishes} />
                    </div>

                    <div className="col-12 mb-5">
                        <DishManager onSearch={setGraphDishes} />
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