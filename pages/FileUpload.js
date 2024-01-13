import React, { useState } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "./constant";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleGrantAccess = async (account) => {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    try {
      const tx = await contract.grantAccess(account);
      await tx.wait();
      alert(`Access granted to ${account}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRevokeAccess = async (account) => {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    try {
      const tx = await contract.revokeAccess(account);
      await tx.wait();
      alert(`Access revoked from ${account}`);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFile = async () => {
    if (!file || !fileName) {
      alert("Please select a file and provide a filename.");
      return;
    }

    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    const formData = new FormData();
    formData.append("filename", fileName);
    formData.append("file", file);

    try {
      const res = await fetch("/api/uploadData", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Network response is not OK");
      }

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">File Upload</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Filename"
          onChange={handleFileNameChange}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 rounded p-2"
        />
      </div>

      <button
        onClick={uploadFile}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        Upload
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          Access Control
        </h3>

        <div className="mb-4">
          <label className="block text-gray-600">Grant Access:</label>
          <input
            type="text"
            placeholder="Enter account address"
            id="grantAccount"
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={() =>
              handleGrantAccess(document.getElementById("grantAccount").value)
            }
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 focus:outline-none"
          >
            Grant
          </button>
        </div>

        <div>
          <label className="block text-gray-600">Revoke Access:</label>
          <input
            type="text"
            placeholder="Enter account address"
            id="revokeAccount"
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={() =>
              handleRevokeAccess(document.getElementById("revokeAccount").value)
            }
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none"
          >
            Revoke
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;

// import React, { useState } from "react";
// import { ethers } from "ethers";
// import { contractAbi, contractAddress } from "./constant";

// function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("");

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   };

//   const handleFileNameChange = (e) => {
//     setFileName(e.target.value);
//   };

//   const uploadFile = async () => {
//     if (!file || !fileName) {
//       alert("Please select a file and provide a filename.");
//       return;
//     }

//     const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = web3Provider.getSigner();
//     const contract = new ethers.Contract(contractAddress, contractAbi, signer);

//     const formData = new FormData();
//     formData.append("filename", fileName);
//     formData.append("file", file);

//     try {
//       const res = await fetch("/api/uploadData", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error("Network response is not OK");
//       }

//       const data = await res.json();
//       alert(data.message);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h2>File Upload</h2>
//       <input
//         type="text"
//         placeholder="Enter Filename"
//         onChange={handleFileNameChange}
//       />
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={uploadFile}>Upload</button>
//     </div>
//   );
// }

// export default FileUpload;
