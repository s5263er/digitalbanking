import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';

function AdminPage() {
  const [pendingLoans, setPendingLoans] = useState([]);

  useEffect(() => {
    // Fetch pending loan applications when the component mounts
    fetchPendingLoans();
  }, []);

  const fetchPendingLoans = async () => {
    try {
      const response = await axios.get('http://localhost:5062/api/pending-loans', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      setPendingLoans(response.data);
    } catch (error) {
      console.error('Error fetching pending loans', error);
    }
  };

  const handleApproveLoan = async (loanId) => {
    try {
      const response = await axios.post(
        `http://localhost:5062/api/approve-loan/${loanId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        }
      );
      if (response.status === 200) {
        // Remove the approved loan from the list of pending loans
        setPendingLoans((prevLoans) => prevLoans.filter((loan) => loan.loanId !== loanId));
        console.log('Loan approved successfully');
      } else {
        console.error('Loan approval failed');
      }
    } catch (error) {
      console.error('Error approving loan', error);
    }
  };

  const handleRejectLoan = async (loanId) => {
    try {
      const response = await axios.post(
        `http://localhost:5062/api/reject-loan/${loanId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        }
      );
      if (response.status === 200) {
        // Remove the rejected loan from the list of pending loans
        setPendingLoans((prevLoans) => prevLoans.filter((loan) => loan.loanId !== loanId));
        console.log('Loan rejected successfully');
      } else {
        console.error('Loan rejection failed');
      }
    } catch (error) {
      console.error('Error rejecting loan', error);
    }
  };

  return (
    <div className="admin-page">
      <div className="app-bar">
        <h2>Pending Loan Applications</h2>
      </div>
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Amount</th>
              <th>Interest Rate</th>
              <th>Term (Months)</th>
              <th>ApplicationDate</th>
              <th>Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingLoans.map((loan) => (
              <tr key={loan.loanId}>
                <td>{loan.loanId}</td>
                <td>${loan.amount}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.termMonths} months</td>
                <td>{loan.applicationDate}</td>
                <td>
                  <button onClick={() => handleApproveLoan(loan.loanId)}>Approve</button>
                </td>
                <td>
                  <button className="reject-button" onClick={() => handleRejectLoan(loan.loanId)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
