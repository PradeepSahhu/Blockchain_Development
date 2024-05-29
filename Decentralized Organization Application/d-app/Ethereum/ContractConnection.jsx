const { ethers } = require("ethers");

// import { ethers } from "ethers";
// import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import { useEffect, useState } from "react";

function ContractConnection() {
  const contractAddress = process.env.CONTRACT_ADDRESS;

  const abi = process.env.ABI;
  try {
    const signer = provider.getSigner();
    const smartContract = new ethers.Contract(contractAddress, abi, provider);
    const contractWithSigner = smartContract.connect(signer);

    return contractWithSigner;

    // const response = await contractWithSigner.readNum();
    // console.log(response);

    // console.log(parseInt(response));
    // // setStoredNumber(parseInt(response));
    // // setRetrieveLoader(false);
    // return;
  } catch (error) {
    // alert(error);
    // setRetrieveLoader(false);
    return;
  }
}

// async function writeNumber() {
//   try {
//     // setStoreLoader(true);
//     const signer = provider.getSigner();
//     const smartContract = new ethers.Contract(contractAddress, abi, provider);
//     const contractWithSigner = smartContract.connect(signer);

//     // interact with the methods in smart contract as it's a write operation, we need to invoke the transation usinf .wait()
//     const writeNumTX = await contractWithSigner.writeNum(4);
//     const response = await writeNumTX.wait();
//     console.log(await response);
//     // setStoreLoader(false);

//     console.log(`Number stored successfully ${enteredNumber}`);
//     return;
//   } catch (error) {
//     // alert(error);
//     // setStoreLoader(false);
//     return;
//   }
// }

// async function payingToContract() {
//   try {
//     // setStoreLoader(true);
//     const signer = provider.getSigner();

//     const smartContract = new ethers.Contract(contractAddress, abi, provider);
//     const contractWithSigner = smartContract.connect(signer);

//     const paytx = await contractWithSigner.Paying({ value: 2 });
//     const response = paytx.wait();
//     console.log(await response);

//     console.log(await parseInt(response));
//     console.log("Transaction has completed");
//     // setStoreLoader(false);

//     return;
//   } catch (e) {
//     console.log(e);
//     // setRetrieveLoader(false);
//   }
// }

// async function getBalancing() {
//   try {
//     // setRetrieveLoader(true);
//     const signer = provider.getSigner();

//     const smartContract = new ethers.Contract(contractAddress, abi, provider);
//     const contractWithSigner = smartContract.connect(signer);

//     const balance = await contractWithSigner.getBalance();
//     console.log(parseFloat(balance));

//     setContri(balance);
//     // setRetrieveLoader(false);
//   } catch (e) {
//     console.log(e);
//     // setRetrieveLoader(false);
//   }
// }

// async function getAllContributors() {
//   try {
//     // setRetrieveLoader(true);
//     const signer = provider.getSigner();

//     const smartContract = new ethers.Contract(contractAddress, abi, provider);
//     const contractWithSigner = smartContract.connect(signer);

//     const allcontributors = await contractWithSigner.getPayed();
//     console.log(allcontributors);

//     setContri(allcontributors);
//     // setRetrieveLoader(false);
//   } catch (e) {
//     console.log(e);
//     // setRetrieveLoader(false);
//   }
// }

// async function withDraw() {
//   try {
//     const signer = provider.getSigner();

//     const smartContract = new ethers.Contract(contractAddress, abi, provider);
//     const contractWithSigner = smartContract.connect(signer);

//     const transaction = await contractWithSigner.withDraw();
//     console.log(await transaction.wait());

//     console.log("Successfully withdrawn money");
//   } catch (e) {
//     console.log(e);
//     // setRetrieveLoader(false);
//   }
// }

// writeNumber();

export { ContractConnection };
