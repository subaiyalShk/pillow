const { ethers } = require('ethers');
const contractABI = require('./contractABI.json'); // Replace with the path to your contract's ABI
const contractAddress = '0x48FC53C14561422b669bA9F52187E3e234CB5eC7'; // Replace with your deployed contract address

// Replace with your Ethereum node URL
const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/872528485bf6415e856556cb0e7b8cbc');

// Mint a new NFT
export async function mintNFT(to, tokenId, uri) {
    // Replace with your account and private key
    const wallet = new ethers.Wallet('YourPrivateKey', provider);

    const contract = new ethers.Contract(contractAddress, contractABI, wallet)

    const tx = await contract.safeMint(to, tokenId, uri);
    await tx.wait();
    console.log('NFT Minted');
}

// // Approve a receiver
// async function approveReceiver(tokenId, receiver) {
//     const tx = await contract.approveReceiver(tokenId, receiver);
//     await tx.wait();
//     console.log('Receiver Approved');
// }

// // Transfer an NFT
// async function transferNFT(to, tokenId) {
//     const tx = await contract.transferNFT(to, tokenId);
//     await tx.wait();
//     console.log('NFT Transferred');
// }