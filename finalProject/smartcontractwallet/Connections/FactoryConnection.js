import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

async function FactoryConnection() {
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

    const contractAddress = process.env.FACTORY_CONTRACT_ADDRESS;
    console.log("CONTRACT ADDRESS : " + contractAddress);

    const abi = process.env.FACTORY_ABI;
    console.log("Factory ABI : " + abi);

    try {
      const signer = providerVar.getSigner();
      const smartContract = new ethers.Contract(contractAddress, abi, signer);

      const newSmartContract = smartContract.connect(signer);
      return newSmartContract;
    } catch (error) {
      console.log("Their is some error");
      console.log(error);
    }
  }
}

export default FactoryConnection;
