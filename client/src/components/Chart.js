import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, Label } from 'recharts';

const ExpenseChart = ({ data }) => {
    // Extract categories and calculate total expenses
    const categories = Array.from(new Set(data.map(item => item.category)));
    const totalExpenses = data.reduce((acc, item) => acc + parseFloat(item.amount), 0);

    // Assign random colors to categories
    const colors = categories.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

    // Calculate expenses for each category
    const categoryExpenses = categories.map(category =>
        data
            .filter(item => item.category === category)
            .reduce((acc, item) => acc + parseFloat(item.amount), 0)
    );

    // Data for the pie chart
    const chartData = categories.map((category, index) => ({
        name: category,
        value: categoryExpenses[index],
        color: data.find(item => item.category === category)?.color || colors[index],
    }));

    return (
        <div className='d-flex align-items-center justify-content-center'>
            <PieChart width={400} height={400}>
                <Pie
                    data={chartData}
                    cx={200}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <Label
                        value={`${totalExpenses}`}
                        position="center"
                        content={({ value }) => (
                            <text x={204} y={204} fill="#8884d8" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="800">
                                Expenses: {value}
                            </text>
                        )}
                    />
                </Pie>
                <Tooltip />
            </PieChart>
            {/* <div style={{ textAlign: 'center' }}>
                <p>Total Expenses: {totalExpenses}</p>
            </div> */}
            <Legend
                style={{ position: "relative" }}
                verticalAlign="middle"
                align="right"
                iconSize={10}
                layout="vertical"
                payload={chartData.map((category, index) => ({
                    value: `${category?.name?.toUpperCase()} - ${category.value}`,
                    type: 'circle',
                    color: category.color,
                }))}
            />
        </div>
    );
};

export default ExpenseChart;
