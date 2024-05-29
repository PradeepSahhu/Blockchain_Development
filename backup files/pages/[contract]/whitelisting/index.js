import { useState, useEffect } from "react";
import MainEstablishConnection from "../../../Ethereum/MainConnection";
import { useRouter } from "next/router";

export default function Whitelisting() {
  const router = useRouter();
  const typeFull = ["Founder", "Pre Sale Buyer", "Investor", "Community"];
  const [listofStakeHolders, setlistofStakeHolders] = useState([]);
  const [stakeHoldersAcc, setStakeHoldersAcc] = useState([]);
  async function toRenderAllContributors() {
    const mainConnection = await MainEstablishConnection(router.query.contract);

    try {
      const result = await mainConnection.getAllStackHolder();
      setlistofStakeHolders(result);
      console.log("the contract address is " + router.query.contract);
      console.log("The list of stake holders is " + listofStakeHolders);
      console.log(listofStakeHolders.length);

      initContract(result);
    } catch (error) {
      console.log("Something went wrongin whitelisting index.js");
    }
  }

  async function initContract(allHolderAddresses) {
    const mainConnection = await MainEstablishConnection(router.query.contract);
    const stat = {};
    try {
      allHolderAddresses.map(async (holderAddress) => {
        const result = await mainConnection.isWhiteListed(
          holderAddress.stakeHolderAddress
        );
        stat[{ holderAddress: result }];
      });
    } catch (error) {
      console.log(error);
      console.log("something went wrong in initContract function");
    }
  }

  async function getStakeHolderAcc() {
    const mainConnection = await MainEstablishConnection(router.query.contract);
    try {
      const res = await mainConnection.getStakeHolderAddresses();
      setStakeHoldersAcc(res);
    } catch (error) {
      console.log(error);
      console.log("error in getStakeHolderAcc");
    }
  }
  async function approvingWhiteListing(contriAdd) {
    const mainConnection = await MainEstablishConnection(router.query.contract);
    console.log(contriAdd);
    try {
      const result = await mainConnection.whiteListing(contriAdd);
      alert(result + "is whitelisted");
    } catch (error) {
      console.log("something is wrong in whitelisting function");
      console.log(error);
    }
  }

  useEffect(() => {
    async function operate() {
      await toRenderAllContributors();
    }
    operate();
  }, []);
  return (
    <div className=" h-screen bg-[#373A40]">
      <div className="text-white bg-black grid col-span-4 p-10">
        <p className="grid col-start-1 col-end-1 justify-center align-middle">
          Contributor Address
        </p>
        <p className="grid col-start-2 col-end-2 justify-center align-middle">
          Contibutor Type
        </p>
        <p className="grid col-start-3 col-end-3 justify-center align-middle">
          Contributor Contribution
        </p>
        <p className="grid col-start-4 col-end-4 justify-center align-middle">
          Approval button
        </p>
      </div>
      {/* <div className="h-screen bg-slate-900 grid grid-cols-4 gap-2 text-white "> */}
      {/* main content */}
      {listofStakeHolders.map((eachStakeHolder) => (
        <table className=" bg-slate-900 text-white w-full text-center m-2 rounded-md">
          <tbody>
            <tr>
              <td className=" w-1/4 ">{eachStakeHolder.stakeHolderAddress}</td>
              <td className="w-1/4">
                {typeFull[parseInt(eachStakeHolder.hisType)]}
              </td>
              <td className="w-1/4">{parseInt(eachStakeHolder.stakesHold)}</td>
              <td className="item-center w-1/4">
                <button
                  onClick={() =>
                    approvingWhiteListing(eachStakeHolder.stakeHolderAddress)
                  }
                  className="bg-green-600 px-10 py-5 rounded-md hover:bg-rose-900"
                >
                  Approve
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
    // </div>
  );
}
