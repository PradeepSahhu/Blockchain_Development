"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import FactoryConnection from "@/Connections/FactoryConnection";
import Loading from "./[accounts]/loading";

export default function Home() {
  const [showAllAccounts, setShowAllAccounts] = useState(false);
  const [newAddress, setNewAddress] = useState(null);
  const [saltValue, setSaltValue] = useState(null);
  const [allCreatedAccounts, setAllCreatedAccounts] = useState([]);
  const [ownerAddress, setOwnerAddress] = useState();

  async function init() {
    try {
      const FactoryContract = await FactoryConnection();
    } catch (e) {
      console.log("Can't establish connection with the factory");
    }
  }

  async function CreateAccount() {
    try {
      console.log(newAddress);
      console.log(saltValue);
      const FactoryContract = await FactoryConnection();
      const createAccountRes = await FactoryContract.createAccount(
        newAddress,
        parseInt(saltValue)
      );
      console.log(createAccountRes);
    } catch (e) {
      console.log("Can't create new Account");
    }
  }

  async function getAddressOfAccount() {
    try {
      const FactoryContract = await FactoryConnection();
      const createAccountRes = await FactoryContract.getAddress(
        newAddress,
        parseInt(saltValue)
      );
      console.log(createAccountRes);
    } catch (e) {
      console.log(e);
    }
  }

  async function getAllCreatedAccounts() {
    try {
      console.log(ownerAddress);
      const FactoryContract = await FactoryConnection();
      const response = await FactoryContract.getAllAccountWithOwner(
        ownerAddress
      );
      setAllCreatedAccounts(response);
    } catch (e) {
      console.log("Can't get all the created account from this owner");
    }
  }

  async function setTrueAndGetAllAccounts() {
    await getAllCreatedAccounts();
    setShowAllAccounts(true);
  }

  useEffect(() => {
    async function load() {
      await init();
    }
    load();
  }, []);
  return (
    <div className="bg-black text-white">
      <div className="grid justify-center items-center m-4">
        <p className="text-5xl bg-gradient-to-r from-red-700 via-violet-600 to-sky-600 bg-clip-text text-transparent font-extrabold">
          Create New Smart Contract Wallet
        </p>
      </div>
      <div className=" bg-black text-white grid grid-cols-2 m-10">
        <form className="grid bg-[#005C78] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
          <label className="grid col-start-1 col-end-1 ">
            Enter the Account Owner Address
          </label>
          <input
            className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
            required
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <label>Enter the salt</label>
          <input
            className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
            required
            onChange={(e) => setSaltValue(e.target.value)}
          />
        </form>
      </div>
      <div className="flex justify-center items-center py-5">
        <Link href="1">
          <Suspense fallback={<Loading />}>
            <button
              className="bg-blue-900 p-5 rounded-xl hover:bg-rose-900 "
              onClick={CreateAccount}
            >
              Create Account
            </button>
          </Suspense>
        </Link>
      </div>

      <div className="bg-black text-white my-10">
        <div className="flex justify-center m-10  ">
          <p className="text-5xl bg-gradient-to-r from-red-800 via-violet-600 to-sky-600 bg-clip-text text-transparent font-extrabold">
            Check All Accounts of an Owner
          </p>
        </div>

        <form className="grid bg-[#005C78] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
          <label className="grid col-start-1 col-end-1">
            Enter the Owner Address
          </label>
          <input
            className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5"
            required
            onChange={(e) => setOwnerAddress(e.target.value)}
          />
        </form>
      </div>
      <div className="flex justify-center items-center py-5">
        <button
          className="bg-blue-900 p-5 rounded-xl hover:bg-rose-900 "
          onClick={() => setTrueAndGetAllAccounts()}
        >
          Check the Accounts
        </button>
      </div>

      {showAllAccounts && (
        <div className="text-white bg-black grid col-span-3 p-10">
          <p className="grid col-start-1 col-end-1 justify-center align-middle">
            Owner Address
          </p>
          <p className="grid col-start-2 col-end-2 justify-center align-middle">
            Smart Contract Wallet Address
          </p>
          <p className="grid col-start-3 col-end-3 justify-center align-middle">
            Link To Connect
          </p>
        </div>
      )}
      {allCreatedAccounts.map((eachAccount) => (
        <table className=" bg-slate-900 text-white w-full text-center rounded-xl my-5">
          <tbody>
            <tr>
              <td className=" w-1/3 ">{ownerAddress}</td>
              <td className="w-1/3">{eachAccount}</td>
              <td className="item-center w-1/3">
                <Link href={`${eachAccount}`}>
                  <button className="bg-gradient-to-r from-red-600 to-blue-700 px-10 py-5 rounded-md">
                    Click to Connect
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}
