"use client";
import { useEffect, useState } from "react";
import Clipboard from "clipboard";
import ClipButton from "../components/Clipboard";
import QRCODE from "../components/QRCode";

export default function Accounts({ props }) {
  const textToCopy = "0x161aBA4657174De9a36C3Ee71bC8163118d88d43";

  const [showQr, setShowQr] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="bg-black rounded-xl m-10">
      <div className=" bg-black rounded-lg text-xl bg-opacity-70 my-10">
        Account Address is
      </div>

      <p className="text-6xl">Current Balance is : </p>
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
            onClick={() => setShowQr(true)}
          >
            Verify Owner
          </button>
        </div>
      </div>

      {sending && (
        <div className="m-10  items-center justify-center text-white">
          <div className="grid bg-[#005C78] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
            <label className="">Enter the Address to send To</label>
            <input
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
              required
            />
            <label className="">Enter the Amount to send To</label>
            <input
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
              required
            />
            <div className="flex justify-center items-center">
              <button className="px-10 py-5 rounded-lg bg-gradient-to-r from-orange-600 to-violet-900 font-normal ">
                Send the Payment
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <ClipButton text={`${textToCopy}`}>Copy to Clipboard</ClipButton> */}
      {showQr && (
        <div className="flex justify-center items-center">
          <QRCODE data={textToCopy} />
        </div>
      )}
    </div>
  );
}
