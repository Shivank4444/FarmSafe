import React from 'react'

import Script from 'dangerous-html/react'

import './component.css'

const AppComponent = (props) => {
  return (
    <div className="app-component-container">
      <div className="app-component-container1">
        <div className="app-component-container2">
          <Script
            html={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crime Reporting DApp</title>
    <style>
        @keyframes zoomInOut {
            0% {
                transform: scale(0.8);
                opacity: 0;
            }
            50% {
                transform: scale(1.2);
                opacity: 1;
            }
            100% {
                transform: scale(1);
            }
        }

        .login-container {
            position: relative;
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            background: linear-gradient(115deg, #27272D 5.8%, #27272D 112.6%);
            animation: zoomInOut 1.5s ease-in-out;
            color: #fff;
            text-align: center;
        }

        .login-container::before {
            content: 'Want to report crimes?';
            font-size: 24px;
            margin-top: 20px;
        }

        .login-container::after {
            content: '';
            background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png') no-repeat;
            background-size: contain;
            width: 150px;
            height: 150px;
            position: absolute;
            top: 70%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.8;
        }

        button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 15px 30px;
            margin-top: 20px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: #2980b9;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <button onclick="loginWithMetaMask()">Login with MetaMask</button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/web3@1.6.1/dist/web3.min.js"></script>
    <script>
        async function loginWithMetaMask() {
            if (typeof window.ethereum === 'undefined') {
                return alert('Please install MetaMask or use a Web3-enabled browser.');
            }

            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const userAddress = accounts[0];
                console.log('User logged in successfully with MetaMask!');
                alert('User logged in successfully with MetaMask!');
            } catch (error) {
                console.error(error);
                alert('Error logging in with MetaMask. Please try again.');
            }
        }
    </script>
</body>
</html>
`}
          ></Script>
        </div>
      </div>
    </div>
  )
}

export default AppComponent
