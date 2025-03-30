import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/prices/stock"; // Backend API URL

// Async Thunk to fetch stock prices
export const fetchStockPrice = createAsyncThunk(
    "stock/fetchStockPrice",
    async (symbol) => {
        const response = await axios.get(`${API_URL}/${symbol}`);
        return response.data;
    }
);

const stockSlice = createSlice({
    name: "stock",
    initialState: {
        stockData: {},
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchStockPrice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStockPrice.fulfilled, (state, action) => {
                state.loading = false;
                state.stockData = action.payload;
            })
            .addCase(fetchStockPrice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default stockSlice.reducer;
