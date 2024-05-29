import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MainEstablishConnection from "../../Ethereum/MainConnection";
import currentProvider from "../../Ethereum/SeeProvider";
import convertToNumbers from "../../Ethereum/DateToNum";
import Link from "next/link";
import Animation from "../components/Animation";

// showing contents.

function Content(params) {
  // state Variables using hooks.
  const [owner, setOwner] = useState();
  const [maincontractconnection, setMainContractConnection] = useState();
  const [walletProvider, setwalletProvider] = useState();
  const [allStackHolder, setAllStackHolder] = useState([]);
  const [contri, setContri] = useState("");
  const [contriType, setContriType] = useState();
  const [contriAmount, setContriAmount] = useState();
  const [contriDate, setContriDate] = useState();
  const [balance, setBalance] = useState();

  const router = useRouter();
  console.log("Thre router is : " + router.query.contract);

  async function getwalletProvider() {
    const result = await currentProvider();
    if (result) {
      try {
        const imgSigner = result.getSigner();
        const myCurrentAccountAddress = await imgSigner.getAddress();
        console.log("all accounts are : " + myCurrentAccountAddress);

        setwalletProvider(myCurrentAccountAddress);
        console.log("The current account is : " + walletProvider);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("not working");
    }
  }

  async function getContractBalance() {
    const mainConnection = await MainEstablishConnection(router.query.contract);
    try {
      const result = await mainConnection.getBalance();
      setBalance(parseInt(result));
    } catch (error) {
      console.log(error);
      console.log(
        "their is some problem in getBalance of index.js of config folder"
      );
    }
  }

  async function getOwners() {
    const mainConnection = await MainEstablishConnection(router.query.contract);
    try {
      const result = await mainConnection.getOwner();
      setOwner(result);
      console.log("The result is: " + result);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAll() {
    const mainConnection = await MainEstablishConnection(router.query.contract);
    try {
      const result = await mainConnection.getAllStackHolder();
      setAllStackHolder(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function addStackHolders() {
    const mainConnection = await MainEstablishConnection(router.query.contract);

    var validationPeriod = convertToNumbers(contriDate, contriType);
    parseInt(contriAmount);
    console.log(contri + " " + typeof contri);
    console.log(contriType + " " + typeof contriType);
    console.log(contriAmount + " " + typeof contriAmount);
    console.log(validationPeriod + " " + typeof validationPeriod);
    const result = await mainConnection.addingStackHolder(
      contri,
      contriType,
      contriAmount,
      validationPeriod
    );

    console.log("inserted successfully");
  }

  useEffect(() => {
    async function operations() {
      await getwalletProvider();
      await getOwners();
      await getAll();
      await getContractBalance();
      console.log("This walletProvider is " + walletProvider);
    }
    operations();
  }, [router.query.contract]);

  return (
    <div className="h-screen text-white bg-black grid grid-col-4">
      <div className="grid col-start-1 col-end-4 ">
        <p className="text-5xl py-5 col-span-4 text-center bg-black text-white">
          Contract Details Page
        </p>
        <div className="grid col-start-1 col-end-3">
          <Animation
            url={
              "https://lottie.host/a0470b38-95c0-4d62-a440-33193d9cb0d2/cIO1WFiSHW.json"
            }
          />
        </div>
        <div className="grid col-start-3 col-end-4 align-middle items-center">
          <p className="text-xl">
            <Link href={`https://sepolia.etherscan.io/address/${owner}`}>
              Owner is : {owner}
            </Link>{" "}
          </p>
          <p className="text-xl">contract Address : {router.query.contract}</p>
          <p className="">Balance is : {balance} wei</p>
        </div>
      </div>
      <hr className="outline-pink-900 outline-double border-x-10 border-y-10" />

      <div className="grid col-start-1 col-end-4 mt-5">
        <div className="grid col-start-1 col-end-2">
          <button className="text-white bg-black">
            <Link className="" href={`${router.query.contract}/withdraw`}>
              Go to withdrawal page
            </Link>
          </button>
        </div>

        <div className=" grid col-start-3 col-end-4 bg-slate-900 items-center mt-5">
          <button className="grid col-start-1 col-end-1">
            <Link className="" href={`${router.query.contract}/whitelisting`}>
              Go to whitelisting Page
            </Link>
          </button>
        </div>
      </div>

      {/* {allStackHolder.map((eachStack) => (
        <div>
          <label>{eachStack.stakeHolderAddress}</label>
          <label>{parseInt(eachStack.stakesHold)}</label>
          <label>{parseInt(eachStack.boughtDate)}</label>
        </div>
      ))} */}

      {walletProvider == owner && (
        <div className="grid grid-col-2 gap-2 bg-slate-700 m-10 rounded-md border-solid-900 outline-double outline-pink-500">
          <h1 className="col-start-1 col-end-2 grid justify-center px-10 py-5 text-4xl">
            Contributor Details
          </h1>
          <div className="grid col-start-1 col-end-2 my-2">
            <p className="col-start-1 col-end-1 ml-10 grid text-2xl justify-center">
              Enter the Contributor Address
            </p>
            <input
              className="grid justify-start col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12 text-black rounded-lg outline-double outline-blue-900"
              required
              placeholder="Enter the address of the contributor"
              onChange={(e) => setContri(e.target.value)}
            />
          </div>
          <div className="grid col-start-1 col-end-2 my-2">
            <p className="col-start-1 col-end-1 ml-10 grid text-2xl justify-center">
              Enter the Contributor Type
            </p>
            <select
              className="grid justify-start col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12 text-black rounded-lg outline-double outline-blue-900"
              required
              placeholder="Enter the address of the contributor"
              onChange={(e) => setContriType(parseInt(e.target.value))}
            >
              <option value={0}>Founder</option>
              <option value={1}>Pre Sale buyer</option>
              <option value={2}>Investor</option>
              <option value={3}> Community</option>
            </select>
          </div>
          <div className="grid col-start-1 col-end-2 my-2">
            <p className="col-start-1 col-end-1 ml-10 grid text-2xl justify-center">
              Enter the Contributor Token Amt
            </p>
            <input
              className="grid justify-start col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12 text-black rounded-lg outline-double outline-blue-900"
              required
              placeholder="Enter the address of the contributor"
              onChange={(e) => setContriAmount(parseInt(e.target.value))}
            />
          </div>
          <div className="grid col-start-1 col-end-2 my-2">
            <p className="col-start-1 col-end-1 ml-10 grid text-2xl justify-center">
              Enter the Contributor timeLock
            </p>
            <input
              className="grid justify-start col-start-2 col-end-3 px-20 placeholder:place-content-center py-4 mx-12 text-black rounded-lg outline-double outline-blue-900"
              required
              placeholder="Enter the address of the contributor"
              onChange={(e) => setContriDate(e.target.value)}
              type="date"
            />
          </div>
          <div>
            <button
              className="px-10 py-10 bg-blue-600 rounded-md grid justify-center"
              onClick={addStackHolders}
            >
              Register the Contributor
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
