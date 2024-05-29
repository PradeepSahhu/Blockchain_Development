"use client";

import { useState, useEffect } from "react";
import EstablishConnection from "@/Ethereum/AdvanceConnection";
import Link from "next/link";
import Animation from "../Animation";
import MainEstablishConnection from "@/Ethereum/MainConnection";

function Registration() {
  //variables using hooks.

  const [contracts, setContracts] = useState([]);
  const [dOrgName, setDorgName] = useState([]);
  const [tokenName, setTokenName] = useState();
  const [tokenSymbol, setTokenSymbol] = useState();
  const [orgName, setOrgName] = useState();
  const [balance, setBalance] = useState([]);

  //functions

  async function displayAllContracts() {
    const contractSigner = await EstablishConnection();

    const allContracts = await contractSigner.getAllDeployedContract();

    console.log(allContracts);
    setContracts(allContracts);
    const balArray = [];

    for (var i = 0; i < allContracts.length; i++) {
      balArray.push(await getBalanceOfEach(allContracts[i]));
    }

    setBalance(balArray);
    console.log("The balance array is " + balance);
  }

  async function getRegister() {
    const contractSigner = await EstablishConnection();
    const response = await contractSigner.Registration(
      tokenName,
      tokenSymbol,
      orgName
    );
  }

  async function getBalanceOfEach(contractAddr) {
    const mainConnection = await MainEstablishConnection(contractAddr);
    try {
      const result = await mainConnection.getBalance();
      return result;
    } catch (error) {
      console.log("Their is some error in getBalnce of Registration");
    }
  }

  useEffect(() => {
    displayAllContracts();
  }, []);
  return (
    <div className="bg-black">
      <p className="text-5xl py-5 col-span-2 text-center bg-black text-white">
        Registration Page
      </p>
      <div className="flex justify-center">
        <Animation
          url={
            "https://lottie.host/18a00a90-01c1-49c9-befd-2fae3df6eed8/mz7po5R0pC.json"
          }
          height={300}
          width={500}
        />
      </div>
      <div className="h-screen bg-black text-white grid grid-cols-2">
        <form className="grid bg-[#003285] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
          <label className="grid col-start-1 col-end-1">
            Enter the Token Name
          </label>
          <input
            className="text-white bg-slate-800 px-10 rounded-md mx-5 my-5"
            required
            onChange={(e) => setTokenName(e.target.value)}
          />
          <label>Enter the Token Symbol</label>
          <input
            className="text-white bg-slate-800 px-10 rounded-md mx-5 my-5"
            required
            onChange={(e) => setTokenSymbol(e.target.value)}
          />
          <label>Enter the Organization Name</label>
          <input
            className="text-white bg-slate-800 px-10 rounded-md mx-5 my-5"
            required
            onChange={(e) => setOrgName(e.target.value)}
          />
        </form>
        <div className="grid  col-span-2 bg-black justify-center">
          <button
            className="bg-blue-900 px-20 m-5 text-2xl rounded-xl hover:bg-rose-900 "
            onClick={getRegister}
          >
            Register
          </button>
        </div>

        <div className="col-span-2 text-white my-5">
          <p className="col-span-2 text-center text-5xl">
            Registered Decentralized Autonomous Organization
          </p>
          <div className="text-white bg-black grid grid-col-2 p-10">
            <p className="grid col-start-1 col-end-1 justify-center align-middle">
              Decentralized Autonomous Organization Address
            </p>
            <p className="grid col-start-2 col-end-2 justify-center align-middle">
              Balance
            </p>
          </div>
        </div>

        {contracts.map((contract) => (
          <table className=" bg-slate-900 text-white col-span-2 text-center rounded-md mx-40 place-items-center">
            <tbody>
              <tr className="">
                <td className="w-1/3">
                  <Link href={`${contract}`}>
                    {" "}
                    Contract Address is : {contract}
                  </Link>
                </td>

                <td className="item-center w-1/3">
                  <p className=" px-10 py-5 rounded-md">1200</p>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
}

export default Registration;
