import axios from "axios";

export const fetchStockData = async (ticker: string, startDate: string, endDate: string) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/stocks`, {
      params: { ticker, start_date: startDate, end_date: endDate },
    });
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Stock data not found!" }; 
  }
};
