import React, { useEffect, useState } from 'react';
import './TransferHistory.css';

function TransferHistory() {
  const [transfers, setTransfers] = useState([]);
  const [filteredTransfers, setFilteredTransfers] = useState([]);
  const token = localStorage.getItem('jwtToken');
  const [filters, setFilters] = useState({
    type: 'all', // 'incoming', 'outgoing', or 'all'
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: '',
  });

  // Define an async function to fetch data
  const fetchData = async () => {
    if (token) {
      try {
        const response = await fetch('http://localhost:5062/api/transferhistory', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Set the fetched data in state
        setTransfers(data);
        setFilteredTransfers(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching transfers:', error);
      }
    }
  };

  useEffect(() => {
    console.log('TransferHistory component mounted');
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  // Implement filtering logic based on user-selected criteria
// Implement filtering logic based on user-selected criteria
useEffect(() => {
    const filtered = transfers.filter((transfer) => {
      // Filter by date range
      if (filters.dateFrom && new Date(transfer.date) < new Date(filters.dateFrom)) {
        return false;
      }
      if (filters.dateTo && new Date(transfer.date) > new Date(filters.dateTo)) {
        return false;
      }
  
      // Filter by amount range
      if (
        (filters.minAmount && transfer.amount < parseFloat(filters.minAmount)) ||
        (filters.maxAmount && transfer.amount > parseFloat(filters.maxAmount))
      ) {
        return false;
      }
  
      return true;
    });
  
    setFilteredTransfers(filtered);
  }, [filters, transfers]);
  
  return (
    <div className="transfer-history">
      <div className="app-bar">
        <h1>Transfer History</h1>
      </div>
      <div className="filter-options">
        
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
        />
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Amount"
          value={filters.minAmount}
          onChange={(e) =>
            setFilters({ ...filters, minAmount: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Max Amount"
          value={filters.maxAmount}
          onChange={(e) =>
            setFilters({ ...filters, maxAmount: e.target.value })
          }
        />
      </div>
      <div className="table-container">
        <table className="transfer-table">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransfers.map((transfer) => (
              <tr key={transfer.id}>
                <td>{transfer.fromUserName}</td>
                <td>{transfer.toUserName}</td>
                <td>${transfer.amount}</td>
                <td>{transfer.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransferHistory;
