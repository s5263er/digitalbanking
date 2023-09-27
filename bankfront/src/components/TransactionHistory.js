import React, { useEffect, useState } from 'react';
import './TransferHistory.css';

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransaction, setFilteredTransaction] = useState([]);
  const token = localStorage.getItem('jwtToken');
  const [filters, setFilters] = useState({
    type: 'all', // 'deposit', 'withdrawal', or 'all'
    dateFrom: '2023-09-01', // Your dummy start date
    dateTo: '2023-09-29', // Your dummy end date
      minAmount: '',
    maxAmount: '',
  });

  // Define an async function to fetch data
  const fetchData = async () => {
    if (token) {
      try {
        const response = await fetch('http://localhost:5062/api/transactionhistory', {
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
        setTransactions(data);
        setFilteredTransaction(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching transfers:', error);
      }
    }
  };

  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  // Implement filtering logic based on user-selected criteria
  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      // Filter by transaction type
      if (filters.type !== 'all' && transaction.type !== filters.type) {
        return false;
      }

      // Filter by date range
      if (filters.dateFrom && new Date(transaction.date) < new Date(filters.dateFrom)) {
        return false;
      }
      if (filters.dateTo && new Date(transaction.date) > new Date(filters.dateTo)) {
        return false;
      }

      // Filter by amount range
      if (
        (filters.minAmount && transaction.amount < parseFloat(filters.minAmount)) ||
        (filters.maxAmount && transaction.amount > parseFloat(filters.maxAmount))
      ) {
        return false;
      }

      return true;
    });

    setFilteredTransaction(filtered);
  }, [filters, transactions]);

  return (
    <div className="transfer-history">
      <div className="app-bar">
        <h1>Transfer History</h1>
      </div>
      <div className="filter-options">
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="all">All</option>
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdrawal</option>
        </select>
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
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransaction.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.type}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionHistory;
