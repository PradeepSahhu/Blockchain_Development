"use client";
import { useRouter } from "next/router";
import currentProvider from "@/Ethereum/SeeProvider";
import MainEstablishConnection from "@/Ethereum/MainConnection";
import Animation from "@/app/Animation";
import { useEffect, useState } from "react";
import ConvertNumberToDate from "@/Ethereum/NUMTODATE";

export default function Withdrawal({ params }) {
  // const router = useRouter();

  const [walletProvider, setwalletProvider] = useState();
  const [myDonatedAmount, setMyDonatedAmount] = useState();
  const [isWhiteListed, setIswhiteListed] = useState();
  const [stakeHolderType, setStakeHolderType] = useState();
  const [showDetails, setShowDetails] = useState();
  const [owner, setOwner] = useState();
  const [contractBalance, setContractBalance] = useState();
  const [vastingTime, setVastingTime] = useState(); // implement its function.
  const [state, setState] = useState({ value: "" });

  const [transaction, setTransaction] = useState();

  const stkHold = ["Founder", "Pre Sale Buyer", "Investory", "Community"];

  async function getwalletProvider() {
    const result = await currentProvider();
    if (result) {
      try {
        const imgSigner = result.getSigner();
        const myCurrentAccountAddress = await imgSigner.getAddress();
        console.log("all accounts are : " + myCurrentAccountAddress);

        setwalletProvider(myCurrentAccountAddress);
        console.log("The current account is : " + walletProvider);
        await getOwn();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not working");
    }
  }

  async function getContractBalance() {
    const mainConnection = await MainEstablishConnection(params.contract);
    try {
      const result = await mainConnection.getBalance();
      setContractBalance(parseInt(result));
    } catch (error) {
      console.log("Their is something wrong in getContractBalance function ");
      console.log(error);
    }
  }

  async function getOwn() {
    const mainConnection = await MainEstablishConnection(params.contract);
    try {
      const result = await mainConnection.getOwner();
      setOwner(result);
    } catch (error) {
      console.log("Their is something wrong in getOwn function ");
      console.log(error);
    }
  }

  async function tokenWithdraw() {
    const mainConnection = await MainEstablishConnection(params.contract);
    try {
      if (walletProvider) {
        const resAns = await mainConnection.pseduoWithDrawTokens();
      }
    } catch (error) {
      console.log(
        "There is somethign wrong in index in pseduoWithDrawTokens function"
      );
      console.log(error);
    }
  }

  async function getisWhiteListed() {
    const mainConnection = await MainEstablishConnection(params.contract);
    try {
      if (walletProvider) {
        const resAns = await mainConnection.isWhiteListed(walletProvider);
        setIswhiteListed(resAns);
      }
    } catch (error) {
      console.log(
        "There is somethign wrong in index in withdraw getIswhiteListed function"
      );
      console.log(error);
    }
  }

  async function getStakeHolderType() {
    const mainConnection = await MainEstablishConnection(params.contract);
    try {
      if (walletProvider) {
        const resAns = await mainConnection.getTypeOfStackHolder(
          walletProvider
        );
        setStakeHolderType(resAns);
        console.log("The stake holder type" + stakeHolderType);
      }
    } catch (error) {
      console.log(
        "There is somethign wrong in index in withdraw getStakeHolderType function"
      );
      console.log(error);
    }
  }
  async function getVastingTime() {
    const mainConnection = await MainEstablishConnection(params.contract);
    try {
      if (walletProvider) {
        const resAns = await mainConnection.getVastingTime(walletProvider);
        setVastingTime(parseInt(resAns));
        console.log("The stake holder type" + resAns);
      }
    } catch (error) {
      console.log(
        "There is somethign wrong in index in withdraw getVastingTime function"
      );
      console.log(error);
    }
  }

  async function handleClick() {
    try {
      setShowDetails(true);
      await getOwn();
      await getStakeHolderType();
      await getMyBalance();
      await getVastingTime();
      await getisWhiteListed();
      await getContractBalance();
    } catch (error) {
      console.log("can't all functions");
      console.log(error);
    }
  }

  async function sendTransactionTo() {
    try {
      const mainConnection = await MainEstablishConnection(params.contract);

      const paytx = await mainConnection.sendToken({ value: state.value });
      const response = paytx.wait();
      console.log(await response);

      console.log(parseInt(response));
      console.log("Transaction has completed");

      return;
    } catch (e) {
      console.log(e);
      console.log("Error ");
    }
  }

  function Verified(props) {
    const isWhitelist = props.wht;

    if (isWhitelist) {
      return (
        <button className="grid justify-start bg-green-500 col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12  outline-double outline-blue-900 text-white text-lg hover:text-green-900 rounded-lg ">
          You are whiteListed
        </button>
      );
    } else {
      return (
        <button className="grid bg-rose-900 justify-start col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12 text-white rounded-lg outline-double outline-blue-900 text-lg ">
          You are not WhiteListed
        </button>
      );
    }
  }

  async function getMyBalance() {
    const mainConnection = await MainEstablishConnection(params.contract);
    try {
      if (walletProvider) {
        const resAns = await mainConnection.getContributorsAmount(
          walletProvider
        );
        setMyDonatedAmount(parseInt(resAns));
      }
    } catch (error) {
      console.log(
        "There is somethign wrong in index in withdraw getMyBalance function"
      );
      console.log(error);
    }
  }

  useEffect(() => {
    async function operation() {
      await getwalletProvider();
    }
    operation();
  }, []);

  return (
    <div className="h-screen bg-black text-white ">
      <div className="grid grid-col-4">
        <p className="text-5xl py-5 col-span-4 text-center w-full bg-black text-white">
          Withdrawal Page
        </p>

        <div className="grid col-start-1 col-end-3">
          <Animation
            url={
              "https://lottie.host/958021cc-dad9-44fc-ae15-78eab065bb00/yRQ2revVBK.json"
            }
          />
        </div>
        <div className=" py-5 grid col-start-3 col-end-4 bg-black items-center justify-center">
          <p className="grid text-2xl col-start-1 col-end-4">
            Contract Address : {params.contract}
          </p>
          <p className="grid text-2xl col-start-1 col-end-4">
            Wallet Address: {walletProvider}
          </p>
          <div className=" col-span-full items-center">
            <button
              className="text-white bg-rose-900 px-10 py-5 rounded-lg "
              onClick={handleClick}
            >
              Check Your Details
            </button>
          </div>

          {walletProvider == owner && (
            <div className="grid ml-32">
              <button
                className="text-white bg-green-900 px-10 py-5  rounded-lg"
                onClick={() => setTransaction(true)}
              >
                Send Ether
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="bg-black">
        {showDetails && walletProvider != owner && (
          <div className="grid grid-col-2 gap-2 bg-slate-700 m-10 rounded-md border-solid-900 outline-double outline-pink-500">
            <h1 className="col-start-1 col-end-2 grid justify-center px-10 py-5 text-4xl">
              Your Details
            </h1>
            <div className="grid col-start-1 col-end-2 my-2">
              <p className="col-start-1 col-end-1 grid text-2xl justify-end">
                Contributor Address
              </p>
              <p
                className="grid justify-start col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12 text-[#9B3922] text-lg hover:text-white rounded-lg bg-[#0C0C0C] outline-double outline-blue-900"
                required
                placeholder="Enter the address of the contributor"
              >
                {walletProvider}
              </p>
            </div>
            <div className="grid col-start-1 col-end-2 my-2">
              <p className="col-start-1 col-end-1 ml-10 grid text-2xl justify-center">
                Contributor Type
              </p>
              <p
                className="grid justify-start col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12 text-[#9B3922] text-lg hover:text-white rounded-lg bg-[#0C0C0C] outline-double outline-blue-900"
                required
                placeholder="Enter the address of the contributor"
              >
                {stkHold[stakeHolderType]}
              </p>
            </div>
            <div className="grid col-start-1 col-end-2 my-2">
              <p className="col-start-1 col-end-1 ml-10 grid text-2xl justify-center">
                Contributor Token Amt
              </p>
              <p
                className="grid justify-start col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12 text-[#9B3922] text-lg hover:text-white rounded-lg bg-[#0C0C0C] outline-double outline-blue-900"
                required
                placeholder="Enter the address of the contributor"
              >
                {myDonatedAmount}
              </p>
            </div>
            <div className="grid col-start-1 col-end-2 my-2">
              <p className="col-start-1 col-end-1 ml-10 grid text-2xl justify-center">
                Contributor timeLock
              </p>
              <p
                className="grid justify-start col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12 text-[#9B3922] text-lg hover:text-white rounded-lg bg-[#0C0C0C] outline-double outline-blue-900"
                required
                placeholder="Enter the address of the contributor"
                type="date"
              >
                {ConvertNumberToDate(vastingTime)}
              </p>
            </div>
            <div className="grid col-start-1 col-end-2 my-2">
              <p className="col-start-1 col-end-1 ml-10 grid text-2xl justify-center">
                Contributor Whitelisted
              </p>
              <Verified wht={isWhiteListed} />
            </div>
            <div className="grid col-start-1 col-end-2 justify-center items-center">
              <button
                className="px-10 py-8 my-6 bg-blue-600 rounded-md grid justify-center"
                onClick={tokenWithdraw}
              >
                Withdraw Now
              </button>
            </div>
          </div>
        )}
        {showDetails && walletProvider == owner && (
          <div className="grid grid-col-2 gap-2 bg-slate-700 m-10 rounded-md border-solid-900 outline-double outline-pink-500">
            <h1 className="col-start-1 col-end-2 grid justify-center px-10 py-5 text-4xl">
              Your Details
            </h1>
            <div className="grid col-start-1 col-end-2 my-2">
              <p className="col-start-1 col-end-1 grid text-2xl justify-end">
                Contributor Address
              </p>
              <p
                className="grid justify-start col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12 text-[#9B3922] text-lg hover:text-white rounded-lg bg-[#0C0C0C] outline-double outline-blue-900"
                required
                placeholder="Enter the address of the contributor"
              >
                {walletProvider}
              </p>
            </div>
            <div className="grid col-start-1 col-end-2 my-2">
              <p className="col-start-1 col-end-1 ml-10 grid text-2xl justify-center">
                Contributor Type
              </p>
              <p
                className="grid justify-start col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12  text-[#9B3922] text-lg hover:text-white rounded-lg bg-[#0C0C0C] outline-double outline-blue-900"
                required
                placeholder="Enter the address of the contributor"
              >
                Creator
              </p>
            </div>
            <div className="grid col-start-1 col-end-2 my-2">
              <p className="col-start-1 col-end-1 ml-10 grid text-2xl justify-center">
                Contributor Token Amt
              </p>
              <p
                className="grid justify-start col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12  text-[#9B3922] text-lg hover:text-white rounded-lg bg-[#0C0C0C] outline-double outline-blue-900"
                required
                placeholder="Enter the address of the contributor"
              >
                {contractBalance}
              </p>
            </div>

            <div className="grid col-start-1 col-end-2 my-2">
              <p className="col-start-1 col-end-1 ml-10 grid text-2xl justify-center">
                Contributor Whitelisted
              </p>
              <p
                className="grid justify-start col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12  text-[#9B3922] text-lg hover:text-white rounded-lg bg-[#0C0C0C] outline-double outline-blue-900"
                required
                placeholder="Enter the address of the contributor"
              >
                Contract Creator
              </p>
            </div>
            <div className="grid col-start-1 col-end-2 justify-center items-center">
              <button
                onClick={tokenWithdraw}
                className="px-10 py-8 my-6 bg-black rounded-md grid justify-center hover:bg-rose-900"
              >
                Withdraw Now
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="bg-black h-screen">
          {transaction && walletProvider == owner && (
            <div>
              <p className="text-5xl py-5 col-span-4 text-center w-full bg-black text-white">
                Add Money to Contract
              </p>
              <div className="grid col-start-1 col-end-2 my-2">
                <p className="col-start-1 col-end-1 ml-10 grid text-2xl justify-center">
                  Token Amount
                </p>
                <input
                  className="grid justify-start col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12  text-[#9B3922] text-lg hover:text-white rounded-lg bg-[#0C0C0C] outline-double outline-blue-900"
                  required
                  placeholder="Enter the amount in wei to add in this contract"
                  onChange={(event) => setState({ value: event.target.value })}
                />
              </div>
              <div className=" flex justify-center">
                <button
                  type="button"
                  class="px-16 py-2 relative text-md font-medium items-center overflow-hidden mt-10 justify-center bg-black rounded-2xl text-white bg-gradient-to-br from-black to-blue-500 group-hover:from-blue-600 hover:to-blue-700"
                  onClick={() => sendTransactionTo()}
                >
                  {" "}
                  <svg
                    class="object-left"
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
                    <path
                      fill="#8c8c8c"
                      d="M127.962 416.905v-104.72L0 236.585z"
                    />
                    <path
                      fill="#141414"
                      d="m127.961 287.958l127.96-75.637l-127.96-58.162z"
                    />
                    <path
                      fill="#393939"
                      d="m.001 212.321l127.96 75.637V154.159z"
                    />
                  </svg>
                  <span class="">Send Ether to the contract</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

{
  /* <p
              className="grid justify-start col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12 text-black rounded-lg outline-double outline-blue-900"
              required
              placeholder="Enter the address of the contributor"
              type="date"
            >
              {isWhiteListed ? "whitelisted" : "not Whitelisted"}
            </p> */
}
