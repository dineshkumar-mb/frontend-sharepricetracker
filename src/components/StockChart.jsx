import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Typography, Paper } from "@mui/material";

const StockChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <Typography color="error">No data available for this stock.</Typography>;
    }

    return (
        <Paper elevation={3} sx={{ padding: 2, marginTop: 3, textAlign: "center" }}>
            <Typography variant="h6" color="primary">
                📈 Stock Price Chart
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="close" stroke="#007bff" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default StockChart;
