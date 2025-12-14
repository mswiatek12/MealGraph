import React, { useEffect, useState, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const GraphVisualizer = ({ dishes }) => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const graphRef = useRef();

    useEffect(() => {
        if (!dishes || dishes.length === 0) {
            setGraphData({ nodes: [], links: [] });
            return;
        }

        const nodesMap = new Map();
        const links = [];

        dishes.forEach(dish => {
            if (!nodesMap.has(dish.name)) {
                nodesMap.set(dish.name, {
                    id: dish.name,
                    group: 'Dish',
                    val: 15,
                    color: '#FF6B6B'
                });
            }

            if(dish.ingredients) {
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
            }

            if(dish.cuisine) {
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
            }
        });

        setGraphData({
            nodes: Array.from(nodesMap.values()),
            links: links
        });

    }, [dishes]);

    useEffect(() => {
        if (graphRef.current && graphData.nodes.length > 0) {
            graphRef.current.d3Force('charge').strength(-200);

            setTimeout(() => {
                if(graphRef.current) {
                    graphRef.current.d3Force('charge').strength(-400); // Strong repulsion
                    graphRef.current.d3Force('link').distance(70);     // Longer links
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

                        nodeLabel="id"
                        linkDirectionalParticles={1}
                        linkDirectionalParticleSpeed={0.005}
                    />
                ) : (
                    <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                        <div className="text-center">
                            <h4>Graph is empty</h4>
                            <p>Perform a search in the Dish Manager below to visualize results.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GraphVisualizer;