// const { ethers } = require("ethers");

// // import { ethers } from "ethers";
// // import Web3Modal from "web3modal";
// // import WalletConnectProvider from "@walletconnect/web3-provider";
// // import { useEffect, useState } from "react";

// import walletProv from "./walletProvider";

// async function ContractConnection() {
//   if (typeof window.ethereum === "undefined") {
//     console.log("Please install wallet.");
//     alert("Please install wallet.");
//     return;
//   } else {
//     // raise a request for the provider to connect the account to our website
//     const web3ModalVar = new Web3Modal({
//       cacheProvider: true,
//       providerOptions: {
//         walletconnect: {
//           package: WalletConnectProvider,
//         },
//       },
//     });
//   }

//   const instanceVar = await web3ModalVar.connect();
//   const providerVar = new ethers.providers.Web3Provider(instanceVar);

//   const contractAddress = process.env.CONTRACT_ADDRESS;
//   console.log(contractAddress);

//   const abi = process.env.ABI;

//   try {
//     const signer = providerVar.getSigner();
//     const smartContract = new ethers.Contract(contractAddress, abi, wallpr);
//     const contractWithSigner = smartContract.connect(signer);

//     return contractWithSigner;

//     // const response = await contractWithSigner.readNum();
//     // console.log(response);

//     // console.log(parseInt(response));
//     // // setStoredNumber(parseInt(response));
//     // // setRetrieveLoader(false);
//     // return;
//   } catch (error) {
//     // alert(error);
//     // setRetrieveLoader(false);
//     return;
//   }
// }

// // async function writeNumber() {
// //   try {
// //     // setStoreLoader(true);
// //     const signer = provider.getSigner();
// //     const smartContract = new ethers.Contract(contractAddress, abi, provider);
// //     const contractWithSigner = smartContract.connect(signer);

// //     // interact with the methods in smart contract as it's a write operation, we need to invoke the transation usinf .wait()
// //     const writeNumTX = await contractWithSigner.writeNum(4);
// //     const response = await writeNumTX.wait();
// //     console.log(await response);
// //     // setStoreLoader(false);

// //     console.log(`Number stored successfully ${enteredNumber}`);
// //     return;
// //   } catch (error) {
// //     // alert(error);
// //     // setStoreLoader(false);
// //     return;
// //   }
// // }

// // async function payingToContract() {
// //   try {
// //     // setStoreLoader(true);
// //     const signer = provider.getSigner();

// //     const smartContract = new ethers.Contract(contractAddress, abi, provider);
// //     const contractWithSigner = smartContract.connect(signer);

// //     const paytx = await contractWithSigner.Paying({ value: 2 });
// //     const response = paytx.wait();
// //     console.log(await response);

// //     console.log(await parseInt(response));
// //     console.log("Transaction has completed");
// //     // setStoreLoader(false);

// //     return;
// //   } catch (e) {
// //     console.log(e);
// //     // setRetrieveLoader(false);
// //   }
// // }

// // async function getBalancing() {
// //   try {
// //     // setRetrieveLoader(true);
// //     const signer = provider.getSigner();

// //     const smartContract = new ethers.Contract(contractAddress, abi, provider);
// //     const contractWithSigner = smartContract.connect(signer);

// //     const balance = await contractWithSigner.getBalance();
// //     console.log(parseFloat(balance));

// //     setContri(balance);
// //     // setRetrieveLoader(false);
// //   } catch (e) {
// //     console.log(e);
// //     // setRetrieveLoader(false);
// //   }
// // }

// // async function getAllContributors() {
// //   try {
// //     // setRetrieveLoader(true);
// //     const signer = provider.getSigner();

// //     const smartContract = new ethers.Contract(contractAddress, abi, provider);
// //     const contractWithSigner = smartContract.connect(signer);

// //     const allcontributors = await contractWithSigner.getPayed();
// //     console.log(allcontributors);

// //     setContri(allcontributors);
// //     // setRetrieveLoader(false);
// //   } catch (e) {
// //     console.log(e);
// //     // setRetrieveLoader(false);
// //   }
// // }

// // async function withDraw() {
// //   try {
// //     const signer = provider.getSigner();

// //     const smartContract = new ethers.Contract(contractAddress, abi, provider);
// //     const contractWithSigner = smartContract.connect(signer);

// //     const transaction = await contractWithSigner.withDraw();
// //     console.log(await transaction.wait());

// //     console.log("Successfully withdrawn money");
// //   } catch (e) {
// //     console.log(e);
// //     // setRetrieveLoader(false);
// //   }
// // }

// // writeNumber();

// export { ContractConnection };

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import nextConfig from "../next.config";

async function ContractConnection() {
  console.log(process);
  if (typeof window.ethereum === "undefined") {
    console.log("Please install wallet.");
    alert("Please install wallet.");
    return;
  } else {
    // raise a request for the provider to connect the account to our website
    const web3ModalVar = new Web3Modal({
      cacheProvider: true,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
        },
      },
    });

    const instanceVar = await web3ModalVar.connect();
    const providerVar = new ethers.providers.Web3Provider(instanceVar);

    const contractAddress = process.env.CONTRACT_ADDRESS;
    console.log(contractAddress);

    const abi = process.env.ABI;
    console.log(abi);

    try {
      const signer = providerVar.getSigner();
      const smartContract = new ethers.Contract(contractAddress, abi, signer);

      const newSmartContract = smartContract.connect(signer);
      return newSmartContract;
      // const response = await contractWithSigner.readNum();
      // console.log(response);

      // console.log(parseInt(response));
      // // setStoredNumber(parseInt(response));
      // // setRetrieveLoader(false);
      // return;
    } catch (error) {
      console.log("Their is some error");
      console.log(error);
    }
  }
}

export default ContractConnection;

// Uncomment and correct these functions as needed
/*
async function writeNumber(provider, contractAddress, abi) {
  try {
    const signer = provider.getSigner();
    const smartContract = new ethers.Contract(contractAddress, abi, signer);
    const writeNumTX = await smartContract.writeNum(4);
    const response = await writeNumTX.wait();
    console.log(response);

    console.log(`Number stored successfully`);
    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function payingToContract(provider, contractAddress, abi) {
  try {
    const signer = provider.getSigner();
    const smartContract = new ethers.Contract(contractAddress, abi, signer);
    const paytx = await smartContract.Paying({ value: ethers.utils.parseEther("2") });
    const response = await paytx.wait();
    console.log(response);

    console.log("Transaction has completed");
    return;
  } catch (e) {
    console.log(e);
  }
}

async function getBalancing(provider, contractAddress, abi, setContri) {
  try {
    const signer = provider.getSigner();
    const smartContract = new ethers.Contract(contractAddress, abi, signer);
    const balance = await smartContract.getBalance();
    console.log(ethers.utils.formatEther(balance));

    setContri(balance);
  } catch (e) {
    console.log(e);
  }
}

async function getAllContributors(provider, contractAddress, abi, setContri) {
  try {
    const signer = provider.getSigner();
    const smartContract = new ethers.Contract(contractAddress, abi, signer);
    const allcontributors = await smartContract.getPayed();
    console.log(allcontributors);

    setContri(allcontributors);
  } catch (e) {
    console.log(e);
  }
}

async function withDraw(provider, contractAddress, abi) {
  try {
    const signer = provider.getSigner();
    const smartContract = new ethers.Contract(contractAddress, abi, signer);
    const transaction = await smartContract.withDraw();
    console.log(await transaction.wait());

    console.log("Successfully withdrawn money");
  } catch (e) {
    console.log(e);
  }
}
*/
