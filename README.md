# Web3WalletConnector

A simple and flexible JavaScript library to connect to various cryptocurrency wallets via deep linking for both mobile and desktop devices. WalletConnector supports multiple wallets, including MetaMask, Trust Wallet, Coinbase Wallet, and more.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Connect Your Mobile Web3 Wallet](#connect-your-mobile-web3-wallet)
- [Supported Wallets](#supported-wallets)
- [API Reference](#api-reference)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Features
- Connect to multiple wallets using deep links.
- Automatically detects mobile devices.
- Supports sending transactions and signing messages.
- Fetches data from smart contracts.
- Easy to use and integrate into your application.

## Installation
You can install WalletConnector via npm:

```bash
npm install wallet-connector
```

## Usage

To use the `WalletConnector` in your project, follow these steps:

1. **Import the WalletConnector**

```javascript
import WalletConnector from 'wallet-connector';
```
2. **Create an instance of the WalletConnector**

```javascript
const connector = new WalletConnector();
```
3. **Connect to a wallet**


```javascript
const connectWallet = async () => {
  const walletName = 'metamask'; // or 'trustWallet', 'coinbaseWallet', etc.
  const appUrl = window.location.href; // Your app's URL

  const connected = await connector.connect(walletName, appUrl);
  if (connected) {
    console.log('Wallet connected successfully!');
  } else {
    console.error('Failed to connect wallet.');
  }
};
```
4. **Send Transaction**


```javascript
const sendTransaction = async () => {
  const toAddress = '0xRecipientAddress'; // Replace with the recipient's address
  const value = 0.1; // Amount in Ether to send

  try {
    const txHash = await connector.sendTransaction(toAddress, value);
    console.log('Transaction Hash:', txHash);
  } catch (error) {
    console.error('Transaction error:', error);
  }
};

connectWallet();
sendTransaction();
```
5. **Interact with a smart contract**


```javascript
const contractAddress = '0xYourContractAddress'; // Replace with your contract address
const abi = [/* Your contract ABI */];

// Set the contract ABI
connector.setContractABI(contractAddress, abi);

// Call a read-only function
const getData = async () => {
  try {
    const result = await connector.getContractData(contractAddress, 'yourMethodName', param1, param2);
    console.log('Contract Data:', result);
  } catch (error) {
    console.error('Error fetching contract data:', error);
  }
};

// Send a transaction to a contract
const sendContractTx = async () => {
  try {
    const txHash = await connector.sendContractTransaction(contractAddress, 'yourFunctionName', 2000000, param1, param2);
    console.log('Transaction Hash:', txHash);
  } catch (error) {
    console.error('Error sending transaction to contract:', error);
  }
};

// Call the functions
getData();
sendContractTx();
```


### Key Points:
- The usage section is designed to guide users through the initial setup and basic operations with the `WalletConnector` package.
- Feel free to modify the addresses, method names, and parameters in the code examples as per your application's requirements!


## Supported Wallets

WalletConnector currently supports the following wallets:

| Wallet          | Icon                                     | Deep Link                                           |
|------------------|------------------------------------------|----------------------------------------------------|
| **MetaMask**     | <img src="https://www.sketchappsources.com/resources/source-image/metamask-fox-logo.png" alt="MetaMask" width="50" height="50" /> | Connect via [MetaMask](https://metamask.app.link/dapp/) |
| **Trust Wallet** | <img src="https://logowik.com/content/uploads/images/trust-wallet-shield1721379929.logowik.com.webp" alt="Trust Wallet" width="50" height="50" /> | Connect via [Trust Wallet](trust://wallet/open_url?url=https://example.com) |
| **Coinbase Wallet** | <img src="https://cdn.iconscout.com/icon/free/png-256/free-coinbase-logo-icon-download-in-svg-png-gif-file-formats--web-crypro-trading-platform-logos-pack-icons-7651204.png" alt="Coinbase Wallet" width="50" height="50" /> | Connect via [Coinbase Wallet](https://www.coinbase.com/wallet) |
| **Phantom Wallet** | <img src="https://i.pinimg.com/736x/6e/04/09/6e040925d8e4bd2c8eedfb6da4dc2ece.jpg" alt="Phantom Wallet" width="50" height="50" /> | Connect via [Phantom Wallet](https://phantom.app) |
| **Rainbow Wallet** | <img src="https://play-lh.googleusercontent.com/fMUvmUmIpIDoZGTACYohbY3DE7-24GFkQ21WjVHxa57qluzWrr7khkycE8cz_juhew" alt="Rainbow Wallet" width="50" height="50" /> | Connect via [Rainbow Wallet](rainbow://url?url=https://example.com) |

Feel free to add support for additional wallets by extending the `wallets` object.



### API Reference
- connect(walletName: string, appUrl: string): Promise<boolean>: Connects to the specified wallet and returns a boolean indicating success.
- sendTransaction(to: string, value: number): Promise<string>: Sends Ether to the specified address and returns the transaction hash.
- signMessage(message: string): Promise<string>: Signs a message using the connected wallet and returns the signature.
- setContractABI(contractAddress: string, abi: object): void: Sets the ABI for a specific contract address.
- getContractData(contractAddress: string, methodName: string, ...params: any[]): Promise<any>: Fetches data from a smart contract method.
- sendContractTransaction(contractAddress: string, functionName: string, gas: number, ...params: any[]): Promise<string>: Sends a transaction to a smart contract function.

### Contributing
Contributions are welcome! If you have suggestions for improvements or features, please feel free to submit a pull request.


### Key Enhancements:
- The **Usage** section is structured to guide users clearly through setup and execution steps, with comments for clarity.
- The **Supported Wallets** section now includes examples of how to connect via different wallets.
- The **API Reference** section provides a clear list of methods and their usage.
- The **Error Handling** section encourages users to handle errors gracefully.
- Overall formatting is improved for better readability on platforms like GitHub and npm.
