"use client";
import Image from "next/image";
import Delottie from "./Delottie";
import Button from "./components/Button";
import ButtonSytle from "./components/ButtonStyle";

import { ethers } from "ethers";
// A single Web3 / Ethereum provider solution for all Wallets
import Web3Modal from "web3modal";
// yet another module used to provide rpc details by default from the wallet connected
import WalletConnectProvider from "@walletconnect/web3-provider";
// react hooks for setting and changing states of variables
import { useEffect, useState } from "react";

export default function Home() {
  // env variables are initalised
  // contractAddress is deployed smart contract addressed
  const contractAddress = process.env.CONTRACT_ADDRESS;
  // application binary interface is something that defines structure of smart contract deployed.
  const abi = process.env.ABI;

  // hooks for required variables
  const [provider, setProvider] = useState();

  // response from read operation is stored in the below variable
  const [storedNumber, setStoredNumber] = useState();

  // the value entered in the input field is stored in the below variable
  const [enteredNumber, setEnteredNumber] = useState(0);

  // the variable is used to invoke loader
  const [storeLoader, setStoreLoader] = useState(false);
  const [retrieveLoader, setRetrieveLoader] = useState(false);

  // list of contributors;
  const [listContri, setContri] = useState([]);
  const [state, setState] = useState({ value: "" });

  // InitWallet

  const initWallet = async () => {
    console.log("Button is clicked");
    let accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length == 0) {
      try {
        console.log("init wallet is working");
        // check if any wallet provider is installed. i.e metamask xdcpay etc
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

          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          if (accounts.length === 0) {
            try {
              await window.ethereum.request({ method: "eth_requestAccounts" });
              console.log("MetaMask connected.");
            } catch (error) {
              console.log("can't connect to the account");
            }
          }

          const instanceVar = await web3ModalVar.connect();
          const providerVar = new ethers.providers.Web3Provider(instanceVar);
          setProvider(providerVar);
          // readNumber(providerVar);
          return;
        }
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };

  return (
    <>
      <div className="bg-blue-950 grid grid-cols-5">
        <nav className="px-5 py-6 space-x-4 bg-black col-start-1 col-end-6">
          <svg
            className="absolute m-0 top-1"
            xmlns="http://www.w3.org/2000/svg"
            width="4em"
            height="4em"
            viewBox="0 0 512 512"
          >
            <path
              fill="navy"
              d="M126.12 315.1A47.06 47.06 0 1 1 79.06 268h47.06Zm23.72 0a47.06 47.06 0 0 1 94.12 0v117.84a47.06 47.06 0 1 1-94.12 0Zm47.06-188.98A47.06 47.06 0 1 1 244 79.06v47.06Zm0 23.72a47.06 47.06 0 0 1 0 94.12H79.06a47.06 47.06 0 0 1 0-94.12Zm188.98 47.06a47.06 47.06 0 1 1 47.06 47.1h-47.06Zm-23.72 0a47.06 47.06 0 0 1-94.12 0V79.06a47.06 47.06 0 1 1 94.12 0ZM315.1 385.88a47.06 47.06 0 1 1-47.1 47.06v-47.06Zm0-23.72a47.06 47.06 0 0 1 0-94.12h117.84a47.06 47.06 0 1 1 0 94.12Z"
            />
          </svg>
          <p className="text-white absolute">Pradeep Sahu</p>
          <ul className="flex space-x-10 text-white  justify-end">
            <li className="cursor-pointer hover:text-red-500">Home</li>
            <li className="cursor-pointer hover:text-red-500">
              {" "}
              <a href="https://etherscan.io/" target="_blank">
                Etherscan
              </a>{" "}
            </li>
            <li className="cursor-pointer hover:text-red-500">Gallery</li>
            <li className="cursor-pointer hover:text-red-500">Github</li>
          </ul>
        </nav>
        <main className="text-white flex justify-center col-start-4 col-end-6 space-x-8 row-span-2 items-center">
          <button
            id="wallet"
            type="button"
            className="inline-flex px-0.5 py-1 relative text-lg font-medium items-center overflow-hidden justify-end bg-black rounded-2xl text-white bg-gradient-to-b from-black to-blue-500 group-hover:from-blue-600 hover:to-blue-700"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="3em"
              viewBox="0 0 256 417"
            >
              <path
                fill="#343434"
                d="m127.961 0l-2.795 9.5v275.668l2.795 2.79l127.962-75.638z"
              />
              <path
                fill="#8c8c8c"
                d="M127.962 0L0 212.32l127.962 75.639V154.158z"
              />
              <path
                fill="#3c3c3b"
                d="m127.961 312.187l-1.575 1.92v98.199l1.575 4.601l128.038-180.32z"
              />
              <path fill="#8c8c8c" d="M127.962 416.905v-104.72L0 236.585z" />
              <path
                fill="#141414"
                d="m127.961 287.958l127.96-75.637l-127.96-58.162z"
              />
              <path fill="#393939" d="m.001 212.321l127.96 75.637V154.159z" />
            </svg>
            <span
              className="relative px-1 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-2xl group-hover:bg-opacity-0 "
              onClick={initWallet}
            >
              Connect with Ethereum Wallet
            </span>
          </button>
          <button
            type="button"
            className="relative inline-flex items-center justify-end px-0.5 py-1 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-900 group-hover:from-cyan-500 group-hover:to-blue-900 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="3em"
              viewBox="0 0 256 417"
            >
              <path
                fill="#343434"
                d="m127.961 0l-2.795 9.5v275.668l2.795 2.79l127.962-75.638z"
              />
              <path
                fill="#8c8c8c"
                d="M127.962 0L0 212.32l127.962 75.639V154.158z"
              />
              <path
                fill="#3c3c3b"
                d="m127.961 312.187l-1.575 1.92v98.199l1.575 4.601l128.038-180.32z"
              />
              <path fill="#8c8c8c" d="M127.962 416.905v-104.72L0 236.585z" />
              <path
                fill="#141414"
                d="m127.961 287.958l127.96-75.637l-127.96-58.162z"
              />
              <path fill="#393939" d="m.001 212.321l127.96 75.637V154.159z" />
            </svg>
            <span className="relative px-3 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-2xl group-hover:bg-opacity-0 ">
              Register the Organization
            </span>
          </button>
        </main>
        <div className="col-start-1 col-end-4 auto-cols-auto">
          <Delottie
            url={
              "https://lottie.host/de1414bb-4f16-4e68-a7a0-083ef4842f74/UgXa0nE1Bh.json"
            }
            height={727}
            width={800}
          />
        </div>
      </div>
    </>
  );
}
