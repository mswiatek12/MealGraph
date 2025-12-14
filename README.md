# MealGraph Application

MealGraph is a full-stack web application designed to manage, search, and visualize culinary data using a Graph Database structure. The system treats dishes, ingredients, and cuisines as interconnected nodes, allowing users to explore relationships (e.g., "Which dishes contain Garlic?" or "Show me all Italian meals") through an interactive network graph.

## 🚀 Features

* **Graph Visualization:** Interactive 2D force-directed graph rendering of connections between Dishes, Ingredients, and Cuisines using `react-force-graph-2d`.
* **Dish Management:**
    * Add new dishes with specific attributes (Difficulty, Time, Cuisines, Ingredients).
    * Search for dishes by Name, Cuisine, or Difficulty.
    * Delete dishes from the database.
* **Ingredient Search:**
    * Search for specific ingredients.
    * Filter ingredients by calorie count (e.g., < 100 cal).
    * Identify "Safe" (non-allergen) ingredients.
* **Data Persistence:** All data is stored in a Neo4j Graph Database, preserving complex relationships between entities.

## 🛠️ Tech Stack

### Backend
* **Language:** Java 21
* **Framework:** Spring Boot 4.0.0
* **Database:** Neo4j (Graph Database)
* **Data Access:** Spring Data Neo4j
* **Build Tool:** Gradle

### Frontend
* **Framework:** React 19
* **Build Tool:** Vite
* **Visualization:** `react-force-graph-2d`
* **Styling:** Bootstrap 5
* **HTTP Client:** Axios

### Infrastructure
* **Containerization:** Docker
* **Orchestration:** Docker Compose
* **Web Server:** Nginx (Reverse Proxy for Frontend)

## 📂 Project Structure

```text
MealGraph/
├── src/main/java/com/example/MealGraph/  # Spring Boot Backend Source
├── mealgraph-frontend/                     # React Frontend Source
├── Dockerfile                              # Backend Docker Configuration
├── docker-compose.yml                      # Full Stack Orchestration
└── build.gradle                            # Backend Dependencies