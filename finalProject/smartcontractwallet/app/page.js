"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showAllAccounts, setShowAllAccounts] = useState(false);
  const [allCreatedAccounts, setAllCreatedAccounts] = useState([]);
  return (
    <div className="bg-black text-white">
      <div className="grid justify-center items-center">
        <p className="text-3xl text-white">Create New Smart Contract Wallet</p>
      </div>
      <div className=" bg-black text-white grid grid-cols-2 m-10">
        <form className="grid bg-[#005C78] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
          <label className="grid col-start-1 col-end-1">
            Enter the Account Owner Address
          </label>
          <input
            className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
            required
          />
          <label>Enter the salt</label>
          <input
            className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
            required
          />
        </form>
      </div>
      <div className="flex justify-center items-center py-5">
        <Link href={`1`}>
          <button className="bg-blue-900 p-5 rounded-xl hover:bg-rose-900 ">
            Create Account
          </button>
        </Link>
      </div>

      <div className="bg-black text-white my-10">
        <div className="flex justify-center m-10">
          <p className="text-3xl">Check All Accounts of an Owner</p>
        </div>

        <form className="grid bg-[#005C78] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
          <label className="grid col-start-1 col-end-1">
            Enter the Owner Address
          </label>
          <input
            className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
            required
          />
        </form>
      </div>
      <div className="flex justify-center items-center py-5">
        <button
          className="bg-blue-900 p-5 rounded-xl hover:bg-rose-900 "
          onClick={() => setShowAllAccounts(true)}
        >
          Check the Accounts
        </button>
      </div>
      {/* 
      {showAllAccounts && {allCreatedAccounts.map((eachAccount) => (
        <table className=" bg-slate-900 text-white w-full text-center m-2 rounded-md">
          <tbody>
            <tr>
              <td className=" w-1/4 ">{eachAccount.stakeHolderAddress}</td>
              <td className="w-1/4">
                {typeFull[parseInt(eachAccount.hisType)]}
              </td>
              <td className="w-1/4">{parseInt(eachAccount.stakesHold)}</td>
              <td className="item-center w-1/4">
                <button
                  className="bg-green-600 px-10 py-5 rounded-md hover:bg-rose-900"
                >
                  Connect
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ))}} */}
    </div>
  );
}
