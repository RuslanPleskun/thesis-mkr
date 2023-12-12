import { Pie } from "@ant-design/charts";
import React from "react";

function DemoPie({ data }) {
    // Extract categories and calculate total expenses
    const categories = Array.from(new Set(data.map((item) => item.category)));
    const totalExpenses = data.reduce((acc, item) => acc + parseFloat(item.amount), 0);

    // Assign random colors to categories
    const colors = categories.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

    // Calculate expenses for each category
    const categoryExpenses = categories.map((category) =>
        data
            .filter((item) => item.category === category)
            .reduce((acc, item) => acc + parseFloat(item.amount), 0)
    );

    // Data for the pie chart
    const chartData = categories.map((category, index) => ({
        name: category,
        value: categoryExpenses[index],
        color: data.find((item) => item.category === category)?.color || colors[index],
    }));

    const legendItems = categories.map((category, index) => ({
        name: `${category}: ${categoryExpenses[index]}`,
        value: categoryExpenses[index],
        color: data.find((item) => item.category === category)?.color || colors[index],
    }));

    const colorsArray = chartData?.map(c => c.color);
    console.log(colorsArray)

    const config = {
        appendPadding: 10,
        data: chartData,
        angleField: "value",
        colorField: "name", // Use "name" as the category key in chart data
        color: colorsArray, // Use "name" as the category key in chart data
        radius: 1,
        innerRadius: 0.5,
        label: false,
        legend: false,
        interactions: [{ type: "element-selected" }, { type: "element-active" }],
        tooltip: {
            formatter: (datum) => ({
                name: datum.name,
                value: datum.value,
            }),
        },
        statistic: {
            title: true,
            content: {
                style: {
                    whiteSpace: "pre-wrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
                formatter: function formatter() {
                    const totalValue = chartData.reduce((acc, data) => acc + data.value, 0);
                    return `Expenses: \n${totalValue}`;
                },
            },
        },
        responsive: true, // Enable responsive configuration
    };

    return (
        <div style={{ textAlign: "center", }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                <div className="chartContainer">
                    {
                        chartData?.length > 0 &&
                        <Pie {...config} />
                    }
                </div>
                <div>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <div className="text-start">
                            {legendItems.map((item) => (
                                <div key={item.name} style={{ marginBottom: 8 }}>
                                    <span style={{ color: item.color, marginRight: 8 }}>{'\u25CF'}</span>
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DemoPie;
