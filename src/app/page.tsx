"use client";
import { useState } from "react";
import StockInput from "@/components/stock-input";
import GoogleChart from "@/components/google-chart";
import { fetchStockData } from "@/lib/api";

export default function Home() {
  const [stockData, setStockData] = useState<{ date: string; price: number }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (ticker: string) => {
    setLoading(true);
    const data = await fetchStockData(ticker);
    setStockData(data?.data || []);
    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Inputs */}
      <div className="w-1/4 bg-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Stock Search</h2>
        <StockInput onSearch={handleSearch} />
      </div>

      {/* Right Side - Chart */}
      <div className="w-3/4 p-6 flex justify-center items-center">
        {loading ? <p>Loading...</p> : <GoogleChart stockData={stockData} />}
      </div>
    </div>
  );
}
