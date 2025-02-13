"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

interface StockInputProps {
  onSearch: (ticker: string, startDate: string, endDate: string) => void;
}

export default function StockInput({ onSearch }: StockInputProps) {
  const [ticker, setTicker] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (ticker.trim() && startDate && endDate) {
      const formattedStartDate = format(startDate, "yyyy-MM-dd");
      const formattedEndDate = format(endDate, "yyyy-MM-dd");
      onSearch(ticker.toUpperCase(), formattedStartDate, formattedEndDate);
    }
  };

  const validateInputs = (newStartDate: Date | null, newEndDate: Date | null, newTicker: string) => {
    if (!newTicker.trim()) {
      setError("Stock ticker is required.");
      return;
    }
    if (!newStartDate || !newEndDate) {
      setError("Both start and end dates are required.");
      return;
    }
    if (newStartDate > newEndDate) {
      setError("Start date cannot be after the end date.");
      return;
    }
    setError("");
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm mb-2 text-gray-700 font-medium">Stock Ticker:</label>
        <input
          type="text"
          placeholder="Enter Stock Ticker (e.g., AAPL)"
          value={ticker}
          onChange={(e) => {
            setTicker(e.target.value);
            validateInputs(startDate, endDate, e.target.value);
          }}
          className="border p-2 rounded-md w-full text-gray-700"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2 text-lg font-medium">Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            validateInputs(date, endDate, ticker);
          }}
          className="border p-2 rounded-md w-full text-gray-700"
          dateFormat="yyyy-MM-dd"
          maxDate={new Date()} 
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2 text-sm font-medium">End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            validateInputs(startDate, date, ticker);
          }}
          className="border p-2 rounded-md w-full text-gray-700"
          dateFormat="yyyy-MM-dd"
          maxDate={new Date()} 
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white p-2 rounded-md disabled:opacity-50"
        disabled={!ticker.trim() || !startDate || !endDate || !!error} 
      >
        Search
      </button>
    </div>
  );
}
