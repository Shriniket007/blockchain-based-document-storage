export const API_URL = "https://volta-rpc.energyweb.org/";

// metamask wallet private key
export const PRIVATE_KEY = process.env.wallet_key;
// intial worikng test.sol
// export const contractAddress = "0xC08a1bd7c6faDA4aA76fc6d3255E4d2492A56d86";

// test2.sol
// export const contractAddress = "0x1bb70F48E5310D2c3Bb07eAc62cbC70D274F7f43";

// s123.sol
export const contractAddress = process.env.address;
export const Web3StorageAPI = process.env.API;

// test.sol
// export const contractAbi = [
//   {
//     inputs: [],
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "fileName",
//         type: "string",
//       },
//       {
//         internalType: "string",
//         name: "ipfsHash",
//         type: "string",
//       },
//     ],
//     name: "upload",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     name: "files",
//     outputs: [
//       {
//         internalType: "string",
//         name: "fileName",
//         type: "string",
//       },
//       {
//         internalType: "string",
//         name: "ipfsHash",
//         type: "string",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getAllFileHashes",
//     outputs: [
//       {
//         internalType: "string[]",
//         name: "",
//         type: "string[]",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "fileName",
//         type: "string",
//       },
//     ],
//     name: "getIPFSHash",
//     outputs: [
//       {
//         internalType: "string",
//         name: "",
//         type: "string",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "fileName",
//         type: "string",
//       },
//     ],
//     name: "isFileStored",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "owner",
//     outputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ];

// test2.sol
// export const contractAbi = [
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_account",
//         type: "address",
//       },
//     ],
//     name: "grantAccess",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_account",
//         type: "address",
//       },
//     ],
//     name: "revokeAccess",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "fileName",
//         type: "string",
//       },
//       {
//         internalType: "string",
//         name: "ipfsHash",
//         type: "string",
//       },
//     ],
//     name: "upload",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     name: "accessControl",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "hasAccess",
//         type: "bool",
//       },
//       {
//         internalType: "bool",
//         name: "exists",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     name: "files",
//     outputs: [
//       {
//         internalType: "string",
//         name: "fileName",
//         type: "string",
//       },
//       {
//         internalType: "string",
//         name: "ipfsHash",
//         type: "string",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getAllFileHashes",
//     outputs: [
//       {
//         internalType: "string[]",
//         name: "",
//         type: "string[]",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "fileName",
//         type: "string",
//       },
//     ],
//     name: "getIPFSHash",
//     outputs: [
//       {
//         internalType: "string",
//         name: "",
//         type: "string",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "string",
//         name: "fileName",
//         type: "string",
//       },
//     ],
//     name: "isFileStored",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "owner",
//     outputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ];

// test3.sol
export const contractAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "grantAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "revokeAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "fileName",
        type: "string",
      },
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
    ],
    name: "upload",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "accessControl",
    outputs: [
      {
        internalType: "bool",
        name: "hasAccess",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "files",
    outputs: [
      {
        internalType: "string",
        name: "fileName",
        type: "string",
      },
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllFileHashes",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "getFilesForAccount",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "fileName",
        type: "string",
      },
    ],
    name: "getIPFSHash",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "fileName",
        type: "string",
      },
    ],
    name: "isFileStored",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
// new contract adress
// 0xe7273D9Cff0Cb5722eEF0a6EccfC886AB826CF2E
// https://volta-explorer.energyweb.org/address/0xe7273D9Cff0Cb5722eEF0a6EccfC886AB826CF2E/

// https://bafybeid2vny27skfulpv63j5uuoul3ouk7swtvrrzpvoskapb2rkalxu6m.ipfs.w3s.link/uploads

// https://ipfs.io/ipfs/<CID>
// Content Identifier (CID)
// IPFS currently uses SHA-256 by default, which produces a 256 bit (32 byte) output, and that output is encoded with Base58. Base58 is a binary-to-text encoding scheme originally developed for Bitcoin and has the advantage that letters that might be mistaken for each other in certain fonts (like zero and the capital letter O) are not included.
