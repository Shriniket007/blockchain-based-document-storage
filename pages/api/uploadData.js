// api/uploadData.js
import { Web3Storage, getFilesFromPath } from "web3.storage";
const { ethers } = require("ethers");
import * as Constants from "../constant";
import formidable from "formidable";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parser
  },
};

function moveFileToServer(req) {
  return new Promise((resolve, reject) => {
    const options = {};
    options.uploadDir = path.join(process.cwd(), "/pages/uploads");
    options.filename = (name, ext, path, form) => {
      return path.originalFilename;
    };
    const form = formidable(options);

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        reject("Something went wrong");
        return;
      }
      const uniqueFileName = fields.filename;
      const actualFileName = files.file.originalFilename;

      resolve({ uniqueFileName, actualFileName });
    });
  });
}

async function storeDataInBlockchain(actualFileName, uniqueFileName) {
  const provider = new ethers.providers.JsonRpcProvider(Constants.API_URL);
  const signer = new ethers.Wallet(Constants.PRIVATE_KEY, provider);
  const StorageContract = new ethers.Contract(
    Constants.contractAddress,
    Constants.contractAbi,
    signer
  );

  const isStored = await StorageContract.isFileStored(uniqueFileName);

  console.log(isStored);

  if (isStored == false) {
    const token = Constants.Web3StorageAPI;
    const storage = new Web3Storage({ token: token });
    const uploadPath = path.join(process.cwd(), "/pages/uploads");
    const files = await getFilesFromPath(uploadPath, `/${actualFileName}`);
    const cid = await storage.put(files);
    let hash = cid.toString();
    console.log("Storing the data in IPFS");

    // creation of transaction
    const tx = await StorageContract.upload(uniqueFileName, hash);
    await tx.wait();
    const storedhash = await StorageContract.getIPFSHash(uniqueFileName);
    return {
      message: `IPFS hash is stored in the smart contract: ${storedhash}`,
      Hash: storedhash,
    };
  } else {
    console.log("Data is already stored for this file name");
    const IPFShash = await StorageContract.getIPFSHash(uniqueFileName);
    return {
      message: `IPFS hash is already stored in the smart contract: ${IPFShash}`,
      Hash: IPFShash,
    };
  }
}

export default async function handler(req, res) {
  try {
    const { uniqueFileName, actualFileName } = await moveFileToServer(req);
    console.log("Files are stored in the local server");

    await new Promise((resolve) => setTimeout(resolve, 200)); // Wait for 2 seconds

    const response = await storeDataInBlockchain(
      actualFileName,
      uniqueFileName
    );
    console.log("Hash stored in the smart contract");

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

// import { Web3Storage } from "web3.storage";
// const { ethers } = require("ethers");
// import * as Constants from "../constant";

// export const config = {
//   api: {
//     bodyParser: false, // disable built-in body parser
//   },
// };

// async function storeDataInIPFSAndBlockchain(req) {
//   try {
//     const { fileName, file } = req.body; // Extract the filename and file data from the request

//     // Initialize the Web3Storage client
//     const storage = new Web3Storage({ token: Constants.Web3StorageAPI });

//     // Create a buffer from the file data and upload it to IPFS
//     const cid = await storage.put([
//       {
//         path: fileName,
//         content: file,
//       },
//     ]);
//     const ipfsHash = cid.toString();

//     // Connect to the Ethereum network
//     const provider = new ethers.providers.JsonRpcProvider(Constants.API_URL);
//     const signer = new ethers.Wallet(Constants.PRIVATE_KEY, provider);
//     const StorageContract = new ethers.Contract(
//       Constants.contractAddress,
//       Constants.contractAbi,
//       signer
//     );

//     // Check if the file is already stored in the smart contract
//     const isStored = await StorageContract.isFileStored(ipfsHash);

//     if (!isStored) {
//       // Create a transaction to upload the IPFS hash to the smart contract
//       const tx = await StorageContract.upload(ipfsHash);
//       await tx.wait();

//       return {
//         message: `IPFS hash is stored in the smart contract: ${ipfsHash}`,
//         Hash: ipfsHash,
//       };
//     } else {
//       return {
//         message: `IPFS hash is already stored in the smart contract: ${ipfsHash}`,
//         Hash: ipfsHash,
//       };
//     }
//   } catch (err) {
//     console.error(err);
//     throw "Something went wrong";
//   }
// }

// async function handler(req, res) {
//   try {
//     if (!req.body.fileName || !req.body.file) {
//       return res
//         .status(400)
//         .json({ error: "Filename and file data not provided" });
//     }

//     const response = await storeDataInIPFSAndBlockchain(req);
//     return res.status(200).json(response);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }

// export default handler;
