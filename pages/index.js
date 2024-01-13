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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-md text-gray-800 w-full max-w-2xl">
        {isConnected ? (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Connected to MetaMask
            </h1>
            <p className="mb-2 text-gray-600">Account: {account}</p>
            {isOwner ? (
              <div>
                <h1 className="text-xl font-bold mb-2 text-gray-800">Owner</h1>
                <FileUpload />
                <FileList />
              </div>
            ) : (
              <div>
                <p className="mb-2 text-gray-600">
                  You are not the owner of the contract.
                </p>
                {isAccessGranted ? (
                  <FileList />
                ) : (
                  <p className="text-red-500">No access granted</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <button
              onClick={handleLoginClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Login with MetaMask
            </button>
            <p className="mt-4 text-gray-600">Connecting to MetaMask...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
