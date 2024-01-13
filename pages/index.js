import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "./constant";
import FileUpload from "./FileUpload";
import FileList from "./FileList";

function App() {
  const [account, setAccount] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  useEffect(() => {
    async function connectToMetaMask() {
      try {
        // Requesting access to the user's MetaMask accounts
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const selectedAccount = accounts[0];
        setAccount(selectedAccount);
        checkOwner(selectedAccount);
        checkAccessGranted(selectedAccount);
        setIsConnected(true);
      } catch (error) {
        console.error(error);
        setIsConnected(false);
      }
    }

    if (window.ethereum) {
      // If MetaMask is detected, you can add a login button to trigger the login process.
      window.ethereum.on("accountsChanged", connectToMetaMask);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", connectToMetaMask);
      }
    };
  }, []);

  const checkOwner = async (selectedAccount) => {
    try {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = web3Provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const owner = await contract.owner();
      setIsOwner(selectedAccount.toLowerCase() === owner.toLowerCase());
    } catch (error) {
      console.error(error);
    }
  };

  const checkAccessGranted = async (selectedAccount) => {
    try {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = web3Provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const isAccessGranted = (await contract.accessControl(selectedAccount))
        .hasAccess;

      setIsAccessGranted(isAccessGranted);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginClick = async () => {
    try {
      // Requesting access to the user's MetaMask accounts
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const selectedAccount = accounts[0];
      setAccount(selectedAccount);
      checkOwner(selectedAccount);
      checkAccessGranted(selectedAccount);
      setIsConnected(true);
    } catch (error) {
      console.error(error);
      setIsConnected(false);
    }
  };

  return (
    <div className="App">
      {isConnected ? (
        <div>
          <h1>Connected to MetaMask</h1>
          <p>Account: {account}</p>
          {isOwner ? (
            <div>
              <h1>Owner</h1>
              <FileUpload />
              <FileList />
            </div>
          ) : (
            <div>
              <p>You are not the owner of the contract.</p>
              {isAccessGranted ? <FileList /> : <p>no access granted</p>}
            </div>
          )}
        </div>
      ) : (
        <div>
          <button onClick={handleLoginClick}>Login with MetaMask</button>
          <p>Connecting to MetaMask...</p>
        </div>
      )}
    </div>
  );
}

export default App;
