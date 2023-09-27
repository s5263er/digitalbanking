import React, { useState, useEffect } from 'react';
import axios from 'axios';
import transfer_logo from "./assets/transfer.png";
import atm_logo from "./assets/atm.png";
import stocks_logo from "./assets/stocks.png";
import './HistoryPage.css'; 


import { Link } from 'react-router-dom';




function HistoryPage() {
    const token = localStorage.getItem('jwtToken');

  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100vh', background: 'linear-gradient(135deg, #000, #111)', color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>
     <div style={{ width: '100%', padding: '20px 0', textAlign: 'center', backgroundColor: '#333' }} className="app-bar">
  <div style={{ fontSize: '24px', fontWeight: 'bold' }} className="app-title">Past Transactions  </div>
</div>

<div style={{ marginTop: '200px'}} className="margin-top">
</div>


      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }} className="squares-container">
        <div style={{ width: '300px', height: '300px', backgroundColor: '#fff', color: '#000', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s, background-color 0.3s' }} className="square payments">
        <Link to="/historytransfer"> 
          <img src={transfer_logo} alt="Transfer Transaction History" style={{ width: '60px', height: '60px', marginBottom: '10px' }} />
          <p>Transfer Transaction History</p>
        </Link>
        </div>
        <div style={{ width: '300px', height: '300px', backgroundColor: '#fff', color: '#000', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s, background-color 0.3s' }} className="square atm">
        <Link to="/historytransaction"> 
          <img src={atm_logo} alt="Transaction History" style={{ width: '60px', height: '60px', marginBottom: '10px' }} />
          <p>Transaction History</p>
          </Link>
        </div>
        <div style={{ width: '300px', height: '300px', backgroundColor: '#fff', color: '#000', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s, background-color 0.3s' }} className="square stocks">
          <Link to="/stockshistory"> 
          <img src={stocks_logo} alt="Stocks History" style={{ width: '60px', height: '60px', marginBottom: '10px' }} />
          <p>Stocks History</p>
          </Link>
        </div>
       
      </div>

    </div>
  );
}

export default HistoryPage;
