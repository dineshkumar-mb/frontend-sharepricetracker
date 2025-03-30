

import React, { useState, useEffect } from "react";
import {
    Container,
    TextField,
    Typography,
    Box,
    Paper,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    CircularProgress,
    Snackbar,
    Alert,
    CssBaseline,
    ThemeProvider,
    createTheme
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StockPrice from "./components/StocPrice"; // Chart component with candlestick support

function App() {
    const [symbol, setSymbol] = useState("AAPL");
    const [exchange, setExchange] = useState("NASDAQ");
    const [timeframe, setTimeframe] = useState("TIME_SERIES_DAILY");
    const [open, setOpen] = useState(false);   // Modal Control
    const [loading, setLoading] = useState(false); // Loading Spinner Control
    const [error, setError] = useState("");    // Error Message Control
    const [darkMode, setDarkMode] = useState(false); // Dark Mode Control

    const handleInputChange = (event) => {
        setSymbol(event.target.value.toUpperCase());
    };

    const handleOpen = async () => {
        setError("");         // Clear previous errors
        setLoading(true);     // Start spinner
        try {
            // Simulate API call delay (replace this with your actual data fetch logic)
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setOpen(true);     // Open modal once data loads
        } catch (err) {
            setError("Failed to fetch stock data. Please try again.");
        } finally {
            setLoading(false); // Stop spinner
        }
    };

    const handleClose = () => setOpen(false);

    // Dark Mode Theme
    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: darkMode
                        ? "linear-gradient(135deg, #424242, #212121)"
                        : "linear-gradient(135deg, #e0f7fa, #80deea)",
                }}
            >
                <Container maxWidth="sm">
                    <Paper
                        elevation={5}
                        sx={{
                            padding: 4,
                            textAlign: "center",
                            borderRadius: "12px",
                        }}
                    >
                        <Typography variant="h4" gutterBottom color="primary">
                            📈 Advanced Stock Price Tracker
                        </Typography>

                        <Button
                            variant="outlined"
                            onClick={() => setDarkMode(!darkMode)}
                            sx={{ marginBottom: 2 }}
                        >
                            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                        </Button>

                        {/* Stock Symbol Input */}
                        <TextField
                            label="Enter Stock Symbol"
                            variant="outlined"
                            fullWidth
                            value={symbol}
                            onChange={handleInputChange}
                            sx={{ marginBottom: 2 }}
                        />

                        {/* Select Exchange */}
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel>Stock Exchange</InputLabel>
                            <Select
                                value={exchange}
                                onChange={(e) => setExchange(e.target.value)}
                            >
                                <MenuItem value="NASDAQ">NASDAQ</MenuItem>
                                {/* <MenuItem value="NYSE">NYSE</MenuItem>
                                <MenuItem value="BSE">BSE</MenuItem>
                                <MenuItem value="NSE">NSE</MenuItem> */}
                            </Select>
                        </FormControl>

                        {/* Select Timeframe */}
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel>Timeframe</InputLabel>
                            <Select
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                            >
                                <MenuItem value="TIME_SERIES_INTRADAY">
                                    Intraday (5 min)
                                </MenuItem>
                                <MenuItem value="TIME_SERIES_DAILY">Daily</MenuItem>
                                <MenuItem value="TIME_SERIES_WEEKLY">Weekly</MenuItem>
                                <MenuItem value="TIME_SERIES_MONTHLY">Monthly</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Button to Show Chart in Modal */}
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleOpen}
                            sx={{
                                marginTop: 2,
                                padding: "10px 0",
                                fontWeight: "bold",
                            }}
                        >
                            {loading ? <CircularProgress size={24} /> : "Get Stock Data"}
                        </Button>

                        {/* Modal for Chart */}
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            maxWidth="md"
                            fullWidth
                        >
                            <DialogTitle>
                                {`📊 ${symbol} Stock Chart (${exchange})`}
                                <IconButton
                                    aria-label="close"
                                    onClick={handleClose}
                                    sx={{
                                        position: "absolute",
                                        right: 8,
                                        top: 8,
                                        color: (theme) => theme.palette.grey[500],
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>

                            <DialogContent dividers>
                                <StockPrice
                                    symbol={symbol}
                                    exchange={exchange}
                                    timeframe={timeframe}
                                />
                            </DialogContent>
                        </Dialog>

                        {/* Error Notification */}
                        <Snackbar
                            open={!!error}
                            autoHideDuration={4000}
                            onClose={() => setError("")}
                        >
                            <Alert severity="error">{error}</Alert>
                        </Snackbar>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;







// import React, { useState } from "react";
// import {
//     Container,
//     TextField,
//     Typography,
//     Box,
//     Paper,
//     MenuItem,
//     Select,
//     FormControl,
//     InputLabel,
//     Button,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     IconButton
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import StockPrice from "./components/StocPrice";  // Assuming this renders the chart

// function App() {
//     const [symbol, setSymbol] = useState("AAPL");
//     const [exchange, setExchange] = useState("NASDAQ");
//     const [timeframe, setTimeframe] = useState("TIME_SERIES_DAILY");
//     const [open, setOpen] = useState(false); // For Modal Control

//     const handleInputChange = (event) => {
//         setSymbol(event.target.value.toUpperCase());
//     };

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     return (
//         <Box
//             sx={{
//                 height: "100vh",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 background: "linear-gradient(135deg, #e0f7fa, #80deea)",
//             }}
//         >
//             <Container maxWidth="sm">
//                 <Paper elevation={5} sx={{ padding: 4, textAlign: "center", borderRadius: "12px" }}>
//                     <Typography variant="h4" gutterBottom color="primary">
//                         📈 Advanced Stock Price Tracker
//                     </Typography>
//                     <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: 3 }}>
//                         Track real-time stock prices across various exchanges.
//                     </Typography>

//                     {/* Stock Symbol Input */}
//                     <TextField
//                         label="Enter Stock Symbol"
//                         variant="outlined"
//                         fullWidth
//                         value={symbol}
//                         onChange={handleInputChange}
//                         sx={{ marginBottom: 2 }}
//                     />

//                     {/* Select Exchange */}
//                     <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                         <InputLabel>Stock Exchange</InputLabel>
//                         <Select value={exchange} onChange={(e) => setExchange(e.target.value)}>
//                             <MenuItem value="NASDAQ">NASDAQ</MenuItem>
//                             <MenuItem value="NYSE">NYSE</MenuItem>
//                             <MenuItem value="BSE">BSE</MenuItem>
//                             <MenuItem value="NSE">NSE</MenuItem>
//                         </Select>
//                     </FormControl>

//                     {/* Select Timeframe */}
//                     <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                         <InputLabel>Timeframe</InputLabel>
//                         <Select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
//                             <MenuItem value="TIME_SERIES_INTRADAY">Intraday (5 min)</MenuItem>
//                             <MenuItem value="TIME_SERIES_DAILY">Daily</MenuItem>
//                             <MenuItem value="TIME_SERIES_WEEKLY">Weekly</MenuItem>
//                             <MenuItem value="TIME_SERIES_MONTHLY">Monthly</MenuItem>
//                         </Select>
//                     </FormControl>

//                     {/* Button to Show Chart in Modal */}
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         onClick={handleOpen}
//                         sx={{ marginTop: 2, padding: "10px 0", fontWeight: "bold" }}
//                     >
//                         Get Stock Data
//                     </Button>

//                     {/* Modal (Dialog) for Chart Display */}
//                     <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//                         <DialogTitle>
//                             {`📊 ${symbol} Stock Chart (${exchange})`}
//                             <IconButton
//                                 aria-label="close"
//                                 onClick={handleClose}
//                                 sx={{
//                                     position: 'absolute',
//                                     right: 8,
//                                     top: 8,
//                                     color: (theme) => theme.palette.grey[500],
//                                 }}
//                             >
//                                 <CloseIcon />
//                             </IconButton>
//                         </DialogTitle>

//                         <DialogContent dividers>
//                             <StockPrice symbol={symbol} exchange={exchange} timeframe={timeframe} />
//                         </DialogContent>
//                     </Dialog>
//                 </Paper>
//             </Container>
//         </Box>
//     );
// }

// export default App;
