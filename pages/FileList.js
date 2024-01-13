import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "./constant";

function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = web3Provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    try {
      const hashes = await contract.getFilesForAccount(signer.getAddress());
      const fileArray = await Promise.all(
        hashes.map(async (hash) => {
          const fileName = await contract.getIPFSHash(hash);
          return { fileName, hash };
        })
      );

      setFiles(fileArray);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">File List</h2>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : files.length > 0 ? (
        <ul className="list-disc list-inside">
          {files.map((file, index) => (
            <li key={index} className="mb-2">
              <a
                href={`https://${file.hash}.ipfs.w3s.link/uploads`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {file.fileName} - {file.hash}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No files found.</p>
      )}
    </div>
  );
}

export default FileList;

// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { contractAbi, contractAddress } from "./constant";

// function FileList() {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const fetchFiles = async () => {
//     const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = web3Provider.getSigner();
//     const contract = new ethers.Contract(contractAddress, contractAbi, signer);

//     try {
//       const hashes = await contract.getAllFileHashes();
//       const fileArray = await Promise.all(
//         hashes.map(async (hash) => {
//           const fileName = await contract.getIPFSHash(hash);
//           return { fileName, hash };
//         })
//       );

//       setFiles(fileArray);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>File List</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : files.length > 0 ? (
//         <ul>
//           {files.map((file, index) => (
//             <li key={index}>
//               <a
//                 href={`https://${file.hash}.ipfs.w3s.link/uploads`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {file.fileName} - {file.hash}
//               </a>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No files found.</p>
//       )}
//     </div>
//   );
// }

// export default FileList;

// {
//   /* <a
// href={`https://ipfs.io/ipfs/${file.hash}`}
// target="_blank"
// rel="noopener noreferrer"
// >
// {file.fileName} - {file.hash}
// </a> */
// }
