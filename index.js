// index.js
import Web3 from "web3";

class WalletConnector {
  constructor() {
    this.web3 = null;
this.wallets = {
  metamask: {
    name: "MetaMask",
    deepLink: (url) => `https://metamask.app.link/dapp/${url}`,
  },
  trustWallet: {
    name: "Trust Wallet",
    deepLink: (url) => `trust://wallet/open_url?url=${url}`,
  },
  coinbaseWallet: {
    name: "Coinbase Wallet",
    deepLink: (url) => `https://www.coinbase.com/wallet/link?url=${url}`,
  },
  argent: {
    name: "Argent",
    deepLink: (url) => `https://link.argent.xyz/?url=${url}`,
  },
  phantom: {
    name: "Phantom",
    deepLink: (url) => `https://phantom.app/ul/${url}`,
  },
  operaWallet: {
    name: "Opera Wallet",
    deepLink: (url) => `https://crypto.wallet.opera.com/launch?url=${url}`,
  },
  exodus: {
    name: "Exodus",
    deepLink: (url) => `exodus://dapp/${url}`,
  },
  imToken: {
    name: "imToken",
    deepLink: (url) => `imtoken://dapp/${url}`,
  },
};

    this.contractABI = {};
  }

  isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  openDeepLink(url) {
    window.location.href = url;
  }

  async connect(walletName, appUrl) {
    const wallet = this.wallets[walletName.toLowerCase()];

    if (!wallet) {
      console.error("Wallet not supported");
      return false;
    }

    const deepLinkUrl = wallet.deepLink(appUrl); // Construct the deep link URL

    if (this.isMobileDevice()) {
      this.openDeepLink(deepLinkUrl);
      return true;
    } else if (typeof window.ethereum !== "undefined") {
      this.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log(`${wallet.name} connected`);
        return true;
      } catch (error) {
        console.error("User denied account access:", error);
        return false;
      }
    } else {
      console.error("No compatible wallet found!");
      return false;
    }
  }

  async sendTransaction(to, value) {
    if (!this.web3) {
      console.error("Wallet not connected");
      return;
    }

    const accounts = await this.web3.eth.getAccounts();
    const transactionParameters = {
      to,
      from: accounts[0],
      value: this.web3.utils.toHex(
        this.web3.utils.toWei(value.toString(), "ether")
      ),
      gas: "2000000",
    };

    try {
      const txHash = await this.web3.eth.sendTransaction(transactionParameters);
      console.log("Transaction Hash:", txHash);
      return txHash;
    } catch (error) {
      console.error("Transaction failed:", error);
      throw error;
    }
  }

  async signMessage(message) {
    if (!this.web3) {
      console.error("Wallet not connected");
      return;
    }

    const accounts = await this.web3.eth.getAccounts();
    const fromAddress = accounts[0];

    try {
      const signature = await this.web3.eth.personal.sign(message, fromAddress);
      return signature;
    } catch (error) {
      console.error("Signing failed:", error);
      throw error;
    }
  }

  setContractABI(contractAddress, abi) {
    this.contractABI[contractAddress] = abi;
  }

  async getContractData(contractAddress, methodName, ...params) {
    if (!this.web3) {
      console.error("Wallet not connected");
      return;
    }

    const abi = this.contractABI[contractAddress];
    if (!abi) {
      console.error("ABI not found for contract:", contractAddress);
      return;
    }

    const contract = new this.web3.eth.Contract(abi, contractAddress);
    try {
      const data = await contract.methods[methodName](...params).call();
      console.log("Contract Data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching contract data:", error);
      throw error;
    }
  }

  async sendContractTransaction(contractAddress, functionName, gas, ...params) {
    if (!this.web3) {
      console.error("Wallet not connected");
      return;
    }

    const abi = this.contractABI[contractAddress];
    if (!abi) {
      console.error("ABI not found for contract:", contractAddress);
      return;
    }

    const contract = new this.web3.eth.Contract(abi, contractAddress);
    const accounts = await this.web3.eth.getAccounts();
    const fromAddress = accounts[0];

    const transactionParameters = {
      from: fromAddress,
      gas: gas ? gas : "2000000",
    };

    try {
      const txHash = await contract.methods[functionName](...params).send(
        transactionParameters
      );
      console.log("Transaction Hash:", txHash);
      return txHash;
    } catch (error) {
      console.error(`Error sending transaction to ${functionName}:`, error);
      throw error;
    }
  }

  async callContractFunction(contractAddress, functionName, ...params) {
    if (!this.web3) {
      console.error("Wallet not connected");
      return;
    }

    const abi = this.contractABI[contractAddress];
    if (!abi) {
      console.error("ABI not found for contract:", contractAddress);
      return;
    }

    const contract = new this.web3.eth.Contract(abi, contractAddress);
    try {
      const result = await contract.methods[functionName](...params).call();
      console.log(`Result from ${functionName}:`, result);
      return result;
    } catch (error) {
      console.error(`Error calling ${functionName}:`, error);
      throw error;
    }
  }
}

export default WalletConnector;
