import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    TimeScale,
    Tooltip,
    Legend,
    Title
} from "chart.js";
import 'chartjs-adapter-date-fns';
import { Line } from "react-chartjs-2";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    TimeScale,
    Tooltip,
    Legend,
    Title
);

const API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY"; // Replace with your actual API key
const API_URL = "https://www.alphavantage.co/query";

const StockPrice = ({ symbol }) => {
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await fetch(
                    `${API_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${API_KEY}`
                );
                const data = await response.json();
                const timeSeries = data["Time Series (60min)"];

                if (!timeSeries) {
                    throw new Error("Invalid data received");
                }

                const formattedData = Object.keys(timeSeries).map((timestamp) => ({
                    date: new Date(timestamp),
                    price: parseFloat(timeSeries[timestamp]["1. open"]),
                }));

                // Sort by date (ascending order)
                formattedData.sort((a, b) => a.date - b.date);

                setStockData(formattedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching stock data:", error);
                setLoading(false);
            }
        };

        fetchStockData();
        const interval = setInterval(fetchStockData, 60000); // Refresh every 60 seconds

        return () => clearInterval(interval);
    }, [symbol]);

    if (loading) return <p>Loading stock prices...</p>;

    const chartData = {
        labels: stockData.map((point) => point.date),
        datasets: [
            {
                label: `${symbol} Stock Price`,
                data: stockData.map((point) => point.price),
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                pointBackgroundColor: "#388E3C",
                pointBorderColor: "#2E7D32",
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
                fill: true
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `${symbol} Live Stock Price`,
                font: { size: 18 },
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (tooltipItem) => `Price: $${tooltipItem.raw.toFixed(2)}`,
                },
            },
            legend: {
                position: "top",
            },
        },
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "hour",
                    tooltipFormat: "MMM dd, HH:mm",
                },
                title: {
                    display: true,
                    text: "Time",
                },
            },
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: "Price (USD)",
                },
            },
        },
    };

    return <Line data={chartData} options={chartOptions} />;
};

export default StockPrice;
