import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ATM.css';

function ATM() {
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState('');
  const token = localStorage.getItem('jwtToken');

  const fetchBalance = async () => {

    if (token) {
      try {
        const response = await axios.get('http://localhost:5062/api/balance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance', error);
      }
    } else {
      console.error('JWT token not found');
    }
  };

  const handleDeposit = async () => {
  
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      try {
        const response = await fetch('http://localhost:5062/api/deposit', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Specify the content type
          },
          
          body: JSON.stringify({ Amount: parseFloat(amount) }),
        });
  
        if (response.ok) {
          // Deposit was successful
          setBalance(balance + parseFloat(amount));
          setAmount('');
          window.alert('Deposit successful!');
        } else {
          // Deposit failed
          console.error('Error depositing money');
          window.alert('Deposit failed. Please try again later.');
        }
      } catch (error) {
        console.error('Error depositing money', error);
        window.alert('Deposit failed. Please try again later.');
      }
    }
  };

  const handleWithdraw = async () => {
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      try {
        const response = await fetch('http://localhost:5062/api/withdraw', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Specify the content type
          },
          body: JSON.stringify({ Amount: parseFloat(amount) }),
        });
        
        if (response.ok) {
          setBalance(balance - parseFloat(amount));
          setAmount('');
          window.alert('Withdrawal successful!');
        } else {
          // Withdrawal failed
          console.error('Error withdrawing money');
          response.text().then(errorMsg => {
            window.alert('Error: ' + errorMsg); // Display the error message
          });
        }
      } catch (error) {
        console.error('Error withdrawing money', error);
        window.alert('Withdrawal failed. Please try again later.');
      }
    }
  };
  
  
  

  
  useEffect(() => {
    fetchBalance();
  }, []); // Empty dependency array means this effect runs once, like componentDidMount




  return (
    <div className="atm-container">
      <div className="balance-widget">
        <h2>Your Balance</h2>
        <span id="balanceAmount">${balance !== null ? balance.toFixed(2) : 'Loading...'}</span>
      </div>
      <div className="button-container">
        <button id="depositBtn" onClick={handleDeposit}>
          Deposit
        </button>
        <input
          type="text"
          id="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button id="withdrawBtn" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default ATM;
