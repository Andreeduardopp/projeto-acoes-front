import axios from "axios";

export const fetchStockData = async (ticker: string) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/stocks?ticker=${ticker}`);
    return response.data; // Expected format: { ticker: "AAPL", data: [{ date: "2024-01-01", price: 180.5 }, ...] }
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
};
