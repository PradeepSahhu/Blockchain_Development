"use client";
import { useEffect, useState } from "react";
import WalletConnection from "@/Connections/WalletConnection";

import QRCODE from "../components/QRCode";

export default function Accounts({ params }) {
  const [showQr, setShowQr] = useState(false);
  const [sending, setSending] = useState(false);
  const [verify, setVerify] = useState(false);
  const [sendAccount, setSendAccount] = useState();
  const [sendAmount, setSendAmount] = useState();
  const [password, setPassword] = useState();
  const [balance, setBalance] = useState();

  async function sendTransaction() {
    try {
      console.log(sendAccount + "  ---> " + sendAmount);
      const SmartWallet = await WalletConnection(params.accounts);
      const res = await SmartWallet.transferTo(
        sendAccount,
        parseInt(sendAmount)
      );
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function Operations() {
      await getBalances();
    }
    Operations();
    console.log(params.accounts);
  }, []);

  async function getBalances() {
    try {
      const SmartWallet = await WalletConnection(params.accounts);
      const balance = await SmartWallet.checkBalance();
      setBalance(parseInt(balance));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="bg-black rounded-xl m-10">
      <div className=" bg-black rounded-lg text-5xl bg-opacity-70 my-10 grid items-center justify-center bg-gradient-to-r from-red-600 via-emerald-700 to-cyan-400 bg-clip-text text-transparent">
        {params.accounts}
      </div>

      <p className="text-6xl">
        Current Balance is :
        <span className="bg-gradient-to-r from-violet-500 via-emerald-700 to-purple-500 bg-clip-text text-transparent">
          {balance}
        </span>
      </p>
      <div className="grid grid-cols-3 m-10">
        <div className="flex justify-center items-center py-5 col-start-1 col-end-1">
          <button
            className=" py-5 px-10 rounded-xl bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 hover:from-pink-600 hover:to-yellow-600 text-lg"
            onClick={() => setSending(true)}
          >
            Send Ether
          </button>
        </div>
        <div className="flex justify-center items-center py-5 col-start-2 col-end-2">
          <button
            className="bg-rose-900 p-5 rounded-xl bg-gradient-to-br from-green-400 to-blue-500 "
            onClick={() => setShowQr(true)}
          >
            Receive Ether
          </button>
        </div>
        <div className="flex justify-center items-center py-5 col-start-3 col-end-3">
          <button
            className="bg-rose-900 p-5 rounded-xl bg-gradient-to-r from-lime-600 to-blue-700 "
            onClick={() => setVerify(true)}
          >
            Verify Owner
          </button>
        </div>
      </div>

      {sending && (
        <div className="m-10  items-center justify-center text-white">
          <div className="text-3xl flex justify-center items-center my-5 ">
            <p className="bg-gradient-to-r from-amber-500 via-orange-600 to-green-500 bg-clip-text text-transparent font-bold">
              Sending to the Address
            </p>
          </div>
          <div className="grid bg-[#005C78] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
            <label className="">Enter the Address to send To</label>
            <input
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
              onChange={(e) => setSendAccount(e.target.value)}
              required
            />
            <label className="">Enter the Amount to send To</label>
            <input
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
              required
              onChange={(e) => setSendAmount(e.target.value)}
            />
            <div className="flex justify-center items-center">
              <button
                className="px-10 py-5 rounded-lg bg-gradient-to-r from-orange-600 to-violet-900 font-normal "
                onClick={() => sendTransaction()}
              >
                Send the Payment
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <ClipButton text={`${textToCopy}`}>Copy to Clipboard</ClipButton> */}
      {showQr && (
        <div className="flex justify-center items-center">
          <div className="text-3xl flex justify-center items-center my-5 ">
            <p className="bg-gradient-to-r from-amber-500 via-orange-600 to-green-500 bg-clip-text text-transparent font-bold">
              Scan or Copy the address to receive
            </p>
          </div>
          <QRCODE data={params.accounts} />
        </div>
      )}

      {verify && (
        <div className="m-10 items-center justify-center text-white">
          <div className="text-3xl flex justify-center items-center my-5 ">
            <p className="bg-gradient-to-r from-amber-500 via-orange-600 to-green-500 bg-clip-text text-transparent font-bold">
              Verify the Owner
            </p>
          </div>
          <div className="grid bg-[#005C78] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
            <label className="">Enter the Password to Verify</label>
            <input
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
              required
            />
            <div className="flex justify-center items-center">
              <button className="px-10 py-5 rounded-lg bg-gradient-to-r from-orange-900 to-violet-900 font-normal ">
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
