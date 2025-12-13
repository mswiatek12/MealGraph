// src/services/MealGraphService.jsx
import axios from 'axios';

const API_URL = "http://localhost:8080/app";

class MealGraphService {

    getDishByName(name) {
        return axios.get(`${API_URL}/dish`, { params: { name } });
    }

    getDishByCuisine(cuisine) {
        return axios.get(`${API_URL}/dish`, { params: { cuisine } });
    }

    getDishByDifficulty(difficulty) {
        return axios.get(`${API_URL}/dish`, { params: { difficulty } });
    }
    getDishByIngredient(ingredientsList) {
        return axios.get(`${API_URL}/dish`, {
            data: ingredientsList,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    addDish(dish) {
        return axios.post(`${API_URL}/dish`, dish);
    }

    updateDish(name, dish) {
        return axios.put(`${API_URL}/dish/${name}`, dish);
    }

    deleteDish(dish) {
        return axios.delete(`${API_URL}/dish`, { data: dish });
    }

    getIngredientByName(name) {
        return axios.get(`${API_URL}/ingredient`, { params: { name } });
    }

    getIngredientByCategory(category) {
        return axios.get(`${API_URL}/ingredient`, { params: { category } });
    }

    getIngredientSafe() {
        return axios.get(`${API_URL}/ingredient/safe`);
    }

    getIngredientByCalories(calories) {
        return axios.get(`${API_URL}/ingredient`, { params: { calories } });
    }
}

export default new MealGraphService();