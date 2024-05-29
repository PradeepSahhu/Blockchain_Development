import ContractConnection from "../../Ethereum/Connection";

function Experiment() {
  const [balance, setBalance] = useState(0);
  const [owner, setOwner] = useState();

  async function readingArrays() {
    const contractInstance = await ContractConnection();

    const bal = await contractInstance.getBalance();

    setBalance(bal);
    return;
  }

  async function getOwner() {
    const contractInstance = await ContractConnection();
    const addr = await contractInstance.ownwerAddress();

    setOwner(addr);
  }

  return (
    <>
      <h2>The balance of this Contract having owner {owner}</h2>
      <p>The balance is : {balance}</p>
    </>
  );
}
export default Experiment;
