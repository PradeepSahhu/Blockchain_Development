import ContractConnection from "../Ethereum/Connection";
import { useEffect, useState } from "react";
function Experiment() {
  const [balance, setBalance] = useState(0);
  const [DonatedAddr, setDonatedAddr] = useState([]);

  async function getBal() {
    const contractInstance = await ContractConnection();

    const bal = await contractInstance.getBalance();

    setBalance(bal);
    return;
  }

  async function getAllContributors() {
    try {
      const contractWithSigner = await ContractConnection();

      const allcontributors = await contractWithSigner.getPayed();
      console.log(allcontributors);
      setDonatedAddr(allcontributors);
    } catch (e) {
      console.log(e);
    }
  }

  console.log("The address is : " + DonatedAddr);

  useEffect(() => {
    getAllContributors();
  }, [1]);

  return (
    <>
      <p>The balance is : {balance}</p>

      {/* {DonatedAddr.map((conti) => (
        <h1>{conti}</h1>
      ))} */}

      {/* <button onClick={getAllContributors}>View </button> */}

      {DonatedAddr.map((contri) => (
        <h1 className="text-black border-solid border-blue-900">{contri}</h1>
      ))}
    </>
  );
}
export default Experiment;
