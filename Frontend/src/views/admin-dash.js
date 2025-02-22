import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import abi from './contractJson/Report.json';
import { ethers } from 'ethers';
import './admin-dash.css';

const AdminDash = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState('None');
  const [reports, setReports] = useState([]);

  
  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contractAddress = '0x6471EACC40D24bC9F4BAB843560eDFEa190730c5'; // Update to your actual contract address
          const contractABI = abi.abi;
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          const accounts = await provider.send('eth_requestAccounts', []);
          setAccount(accounts[0]);
          setState({ provider, signer, contract });
        } catch (error) {
          console.error('Error initializing provider:', error);
        }
      } else {
        alert('Please install MetaMask!');
      }
    };

    initializeProvider();
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      const { contract } = state;
      if (contract) {
        try {
          const reportData = await contract.viewReports();
          // Convert BigNumber to string or number for rendering
          const formattedReports = reportData.map(report => ({
            timestamp: report.timestamp.toNumber(),
            crops: report.crops,
            state: report.state,
            price: ethers.utils.formatUnits(report.price, 0), // Assuming price is in wei, adjust decimals if needed
            quantity: report.quantity.toString(),
            terms: report.terms,
            payment: ethers.utils.formatUnits(report.payment, 0), // Assuming payment is in wei, adjust decimals if needed
          }));
          setReports(formattedReports);
        } catch (error) {
          console.error('Error fetching reports:', error);
        }
      }
    };

    fetchReports();
  }, [state.contract]);

  return (
    <div className="admin-dash-container">
      <Helmet>
        <title>Admin Dashboard - Reports</title>
        <meta property="og:title" content="Admin Dashboard - Reports" />
      </Helmet>
      <div className="admin-dash-container1">
        <div className="admin-dash-container2">
          <h1>Admin Panel - Reports</h1>
          <table id="reportTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Timestamp</th>
                <th>Crops</th>
                <th>State</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Terms</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{new Date(report.timestamp * 1000).toLocaleString()}</td>
                  <td>{report.crops}</td>
                  <td>{report.state}</td>
                  <td>{report.price}</td>
                  <td>{report.quantity}</td>
                  <td>{report.terms}</td>
                  <td>{report.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
