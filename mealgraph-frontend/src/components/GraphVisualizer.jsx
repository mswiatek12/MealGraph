// src/components/GraphVisualizer.jsx
import React, { useEffect, useState, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import axios from 'axios';

const GraphVisualizer = () => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const graphRef = useRef();

    useEffect(() => {
        // Fetch all dishes from your endpoint
        axios.get('http://localhost:8080/app')
            .then(response => {
                const dishes = response.data;
                const nodesMap = new Map();
                const links = [];

                dishes.forEach(dish => {
                    // 1. Add Dish Node
                    if (!nodesMap.has(dish.name)) {
                        nodesMap.set(dish.name, {
                            id: dish.name,
                            group: 'Dish',
                            val: 15,
                            color: '#FF6B6B'
                        });
                    }

                    dish.ingredients.forEach(ing => {
                        if (!nodesMap.has(ing.name)) {
                            nodesMap.set(ing.name, {
                                id: ing.name,
                                group: 'Ingredient',
                                val: 8,
                                color: '#4ECDC4'
                            });
                        }
                        links.push({ source: dish.name, target: ing.name, color: '#e0e0e0' });
                    });

                    dish.cuisine.forEach(c => {
                        if (!nodesMap.has(c.name)) {
                            nodesMap.set(c.name, {
                                id: c.name,
                                group: 'Cuisine',
                                val: 12,
                                color: '#FFE66D'
                            });
                        }
                        links.push({ source: dish.name, target: c.name, color: '#FFE66D' });
                    });
                });

                setGraphData({
                    nodes: Array.from(nodesMap.values()),
                    links: links
                });
            })
            .catch(error => console.error("Error fetching graph data:", error));
    }, []);

    useEffect(() => {
        if (graphRef.current) {
            graphRef.current.d3Force('charge').strength(-200);

            setTimeout(() => {
                if(graphRef.current) {
                    graphRef.current.d3Force('charge').strength(-400);
                    graphRef.current.d3Force('link').distance(70);
                }
            }, 100);
        }
    }, [graphData]);

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-white">
                <h5 className="mb-0">Food Network Graph</h5>
            </div>
            <div className="card-body p-0" style={{ height: '600px', overflow: 'hidden' }}>
                {graphData.nodes.length > 0 ? (
                    <ForceGraph2D
                        ref={graphRef}
                        graphData={graphData}
                        backgroundColor="#ffffff"

                        nodeCanvasObject={(node, ctx, globalScale) => {
                            const label = node.id;
                            const fontSize = 12 / globalScale;
                            const radius = Math.max(node.val, 5);

                            ctx.beginPath();
                            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                            ctx.fillStyle = node.color || '#ccc';
                            ctx.fill();

                            ctx.lineWidth = 1 / globalScale;
                            ctx.strokeStyle = '#333';
                            ctx.stroke();

                            ctx.font = `${fontSize}px Sans-Serif`;
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillStyle = '#000';

                            ctx.fillText(label, node.x, node.y + radius + 1);
                        }}

                        // Optimize interaction
                        nodeLabel="id" // Keep tooltip on hover as backup
                        linkDirectionalParticles={1}
                        linkDirectionalParticleSpeed={0.005}
                    />
                ) : (
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GraphVisualizer;