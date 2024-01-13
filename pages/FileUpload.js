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
    <div>
      <h2>File Upload</h2>
      <input
        type="text"
        placeholder="Enter Filename"
        onChange={handleFileNameChange}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>

      <div>
        <h3>Access Control</h3>
        <label>Grant Access:</label>
        <input
          type="text"
          placeholder="Enter account address"
          id="grantAccount"
        />
        <button
          onClick={() =>
            handleGrantAccess(document.getElementById("grantAccount").value)
          }
        >
          Grant
        </button>

        <label>Revoke Access:</label>
        <input
          type="text"
          placeholder="Enter account address"
          id="revokeAccount"
        />
        <button
          onClick={() =>
            handleRevokeAccess(document.getElementById("revokeAccount").value)
          }
        >
          Revoke
        </button>
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
