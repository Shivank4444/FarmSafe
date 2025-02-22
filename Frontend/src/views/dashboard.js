import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ethers } from 'ethers';
import abi from './contractJson/Report.json'; // Make sure the ABI path is correct
import './dashboard.css';

const Dashboard = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState('None');

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

  const submitForm = async (event) => {
    event.preventDefault();

    const cropType = event.target.elements.cropType.value;
    const stateValue = event.target.elements.state.value;
    const pricePerKg = parseInt(event.target.elements.pricePerKg.value, 10);
    const expectedQuantity = parseInt(event.target.elements.expectedQuantity.value, 10);
    const contractTerms = event.target.elements.contractTerms.value;
    const downPayment = parseInt(event.target.elements.downPayment.value.replace('%', ''), 10); // Convert percentage string to number

    try {
      const { contract } = state;
      if (!contract) {
        console.error('Contract is not initialized.');
        return;
      }

      // Calling the ReportCrime function in the smart contract
      const transaction = await contract.ReportCrime(cropType, stateValue, pricePerKg, expectedQuantity, contractTerms, downPayment);
      await transaction.wait();
      alert('Contract submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <Helmet>
        <title>Dashboard - Contract Form</title>
        <meta property="og:title" content="Dashboard" />
      </Helmet>
      <div className="dashboard-form-container">
        <h1>Contract Form</h1>
        <form id="contractForm" onSubmit={submitForm}>
          <div>
            <label htmlFor="cropType">Type of Crops:</label>
            <select id="cropType" name="cropType" required>
              <option value="" disabled>Select type of crops</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Corn">Corn</option>
              <option value="Barley">Barley</option>
              <option value="Soybeans">Soybeans</option>
            </select>
          </div>
          <div>
            <label htmlFor="state">State:</label>
            <select id="state" name="state" required>
              <option value="" disabled>Select state</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Delhi">Delhi</option>
              <option value="Puducherry">Puducherry</option>
            </select>
          </div>
          <div>
            <label htmlFor="pricePerKg">Price per kg:</label>
            <input type="number" id="pricePerKg" name="pricePerKg" placeholder="Enter price per kg" required />
          </div>
          <div>
            <label htmlFor="expectedQuantity">Expected Quantity:</label>
            <input type="number" id="expectedQuantity" name="expectedQuantity" placeholder="Enter expected quantity" required />
          </div>
          <div>
            <label htmlFor="contractTerms">Contract Terms:</label>
            <textarea id="contractTerms" name="contractTerms" rows="4" cols="50" placeholder="Provide contract terms..." required></textarea>
          </div>
          <div>
            <label htmlFor="downPayment">Down Payment:</label>
            <select id="downPayment" name="downPayment" required>
              <option value="" disabled>Select down payment</option>
              <option value="10%">10%</option>
              <option value="20%">20%</option>
              <option value="30%">30%</option>
            </select>
          </div>
          <button type="submit">Submit Contract</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
