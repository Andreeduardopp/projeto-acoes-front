"use client";
import { useState } from "react";

interface StockInputProps {
  onSearch: (ticker: string) => void;
}

export default function StockInput({ onSearch }: StockInputProps) {
  const [ticker, setTicker] = useState("");

  const handleSearch = () => {
    if (ticker.trim()) {
      onSearch(ticker.toUpperCase());
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Enter Stock Ticker (e.g., AAPL)"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        className="border p-2 rounded-md w-full"
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white p-2 rounded-md">
        Search
      </button>
    </div>
  );
}
