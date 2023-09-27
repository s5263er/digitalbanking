import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoanPage.css'; // Create a CSS file for your LoanPage styling

function LoanPage() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [termMonths, setTermMonths] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userBalance, setUserBalance] = useState(null);
  const [userLoans, setUserLoans] = useState([]);

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    // Fetch the user's balance when the component mounts
    fetchBalance();
    fetchUserLoans();
  }, []);

  const fetchBalance = async () => {
    if (token) {
      try {
        const response = await axios.get('http://localhost:5062/api/balance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance', error);
      }
    } else {
      console.error('JWT token not found');
    }
  };

  const fetchUserLoans = async () => {
    if (token) {
      try {
        const response = await axios.get('http://localhost:5062/api/user-loans', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserLoans(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user loans', error);
      }
    } else {
      console.error('JWT token not found');
    }
  };


  const handleLoanApplication = async () => {

    try {
      const response = await axios.post('http://localhost:5062/api/apply-loan', {
        Amount: parseFloat(loanAmount),
        InterestRate: parseFloat(interestRate),
        TermMonths: parseInt(termMonths),
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          },
      });

      if (response.status === 200) {
        setLoanAmount('');
        setInterestRate('');
        setTermMonths('');
        setErrorMessage('');
        window.alert('Loan application submitted successfully!');
        // After a successful loan application, you may want to update the user's balance
        // You can call fetchBalance() again if the balance is affected by loan approval
      } else {
        console.error('Error submitting loan application');
        window.alert('Error: Loan application failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting loan application', error);
      window.alert('Loan application failed. Please try again later.');
    }
  };

  return (
    <div className="loan-page">
      <div className="balance-widget">
        <h2>Your Balance</h2>
        <div className="futuristic-balance">
          <h2>${userBalance}</h2>
        </div>
      </div>

      <div className="loan-form">
        <h2>Loan Application</h2>
        <div className="input-group">
          <label>Loan Amount:</label>
          <input type="number" step="0.01" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Interest Rate:</label>
          <input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Term (Months):</label>
          <input type="number" value={termMonths} onChange={(e) => setTermMonths(e.target.value)} required />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleLoanApplication}>Apply Loan</button>
      </div>
      <div className="table-container">
        <h2>Your Previous Loans</h2>
        <table className="transfer-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Amount</th>
              <th>Interest Rate</th>
              <th>Term (Months)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {userLoans.map((loan) => (
              <tr key={loan.loanId}>
                <td>
                  {loan.approved === 0
                    ? 'Not Approved'
                    : loan.approved === 1
                    ? 'Approved'
                    : 'Pending'}
                </td>
                <td>${loan.amount}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.termMonths} months</td>
                <td>
                  {loan.approved === 2
                    ? new Date(loan.approvalDate).toLocaleDateString()
                    : new Date(loan.applicationDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LoanPage;
