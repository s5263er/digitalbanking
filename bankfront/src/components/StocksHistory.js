import React, { useState, useEffect } from 'react';
import './StocksHistory.css';

function StocksHistory() {
  const [stockData, setStockData] = useState([]);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    // Fetch stock data from your backend
    // Replace 'YOUR_BACKEND_API_ENDPOINT' with the actual endpoint
    fetch('http://localhost:5062/api/calculate-profits-losses', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Replace with your JWT token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the stockData state with the fetched data
        setStockData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching stock data:', error);
      });
  }, []);

  return (
    <div>
      <div className="stock-history-header">
        <h1>Stocks History</h1>
      </div>
      <div className="stock-history-container">
        <table className="stock-history-table">
          <thead>
            <tr>
              <th>Stock Symbol</th>
              <th>Profit/Loss</th>
              <th>Current Quantity</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((stock) => (
              <tr key={stock.stockSymbol}>
                <td>{stock.stockSymbol}</td>
                <td>${stock.profitLoss.toFixed(2)}</td>
                <td>{stock.currentQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StocksHistory;
