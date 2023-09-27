import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import StocksPage from './components/StocksPage';
import StockSearch from './components/StockSearch';
import ATM from './components/ATM';
import TransferPage from './components/TransferPage';
import HistoryPage from './components/HistoryPage';
import TransferHistory from './components/TransferHistory';
import TransactionHistory from './components/TransactionHistory';
import StocksHistory from './components/StocksHistory';
import LoanPage from './components/LoanPage';
import AdminPage from './components/AdminPage'





function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/stocks/:symbol" element={<StocksPage />} /> 
          <Route path="/stocksearch" element={<StockSearch />} />
          <Route path="/atm" element={<ATM />} />
          <Route path="/transfer" element={<TransferPage/>} />
          <Route path="/history" element={<HistoryPage/>} />
          <Route path="/historytransfer" element={<TransferHistory/>} />
          <Route path="/historytransaction" element={<TransactionHistory/>} />
          <Route path="/stockshistory" element={<StocksHistory/>} />
          <Route path="/loanpage" element={<LoanPage/>} />
          <Route path="/admin" element={<AdminPage/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
