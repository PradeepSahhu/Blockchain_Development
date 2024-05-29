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
