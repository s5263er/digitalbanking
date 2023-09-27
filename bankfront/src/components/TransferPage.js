import React, { useState, useEffect } from 'react'; // Import useEffect
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TransferPage.css'; // Ensure the correct import path for your CSS file

function AppBar() {
  return (
    <div style={{ width: '100%', padding: '20px 0', textAlign: 'center', backgroundColor: '#333',color: '#fff' }} className="app-bar">
      <div style={{ fontSize: '24px', fontWeight: 'bold' }} className="app-title">Layermark Bank</div>
    </div>
  );
}
function TransferPage() {
  const [iban, setIban] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userBalance, setUserBalance] = useState(null); // Rename to userBalance
  const token = localStorage.getItem('jwtToken');

  // Fetch the user's balance when the component mounts
  useEffect(() => {
    fetchBalance();
  }, []); // Empty dependency array to run only once

  const fetchBalance = async () => {
    if (token) {
      try {
        const response = await axios.get('http://localhost:5062/api/balance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserBalance(response.data.balance); // Update userBalance
      } catch (error) {
        console.error('Error fetching balance', error);
      }
    } else {
      console.error('JWT token not found');
    }
  };

  const handleTransfer = async () => {
    // Regular expression to validate a valid float number
    const floatRegex = /^[+-]?([0-9]*[.])?[0-9]+$/;

    if (amount.match(floatRegex) && parseFloat(amount) > 0 && iban.trim() !== '' && name.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:5062/api/transfer', {
          Amount: parseFloat(amount),
          IBAN: iban,
          Name: name,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Specify the content type
          },
        });

        if (response.status === 200) {
          setIban('');
          setName('');
          setAmount('');
          setErrorMessage(''); // Clear any previous error message
          window.alert('Transfer successful!');
          // After a successful transfer, fetch the updated balance
          fetchBalance();
        } else {
          // Transfer failed
          console.error('Error transferring money');
          window.alert('Error: Transfer failed. Please try again later.');
        }
      } catch (error) {
        console.error('Error transferring money', error);
        window.alert('Transfer failed. Please try again later.');
      }
    } else {
      // Display an error message for invalid input
      setErrorMessage('Enter a valid number.');
    }
  };

  return (
    <div>
      <AppBar /> {/* Include the AppBar component here */}
      <div className="transfer-page">
        <div className="balance-widget">
          <h2>Your Balance</h2>
          <div className="futuristic-balance">
            <h2>${userBalance}</h2>
          </div>
        </div>

        <div className="transfer-form">
          <h2>Transfer Money</h2>
          <div className="input-group">
            <label style={{ color: '#fff' }}>IBAN:</label>
            <input type="text" value={iban} onChange={(e) => setIban(e.target.value)} />
          </div>
          <div className="input-group">
            <label style={{ color: '#fff' }}>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="input-group">
            <label style={{ color: '#fff' }}>Amount:</label>
            <input
              type="number" // Specify the input type as number
              step="0.01"   // Allow up to two decimal places
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required      // Make the field required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button onClick={handleTransfer}>Transfer</button>
        </div>
      </div>
    </div>
  );
}

export default TransferPage;