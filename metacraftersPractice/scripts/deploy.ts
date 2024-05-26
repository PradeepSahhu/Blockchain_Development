import { ethers } from "hardhat";
require("dotenv").config();
async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
  const lockedAmount = ethers.parseUnits("1","wei");
  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  const contractAddress =  await lock.getAddress(); 
  console.log(contractAddress);

  const { INFURA_RPC_URL } = process.env;


  const abi = [
    "function withdraw() public {}",
    "function addMappingData(string memory _data, uint value) public {}",
   "function getDataInMapping(string memory _name) public view returns (uint) {}",
   "function getOwner() public view returns (address) {}"
  ]





 await lock.waitForDeployment();

 const ownerAddress = await lock.getOwner();
 console.log(ownerAddress);

 await lock.addMappingData('Pradeep',21);
 setTimeout(()=>{
  console.log("waaiting");
 },1000);


 var data = await lock.getDataInMapping('Pradeep');
 console.log(data);

  
  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${await lock.getAddress()}`
  );
  console.log(lock.interface.fragments[1]);
} // We recommend this pattern to be able to use async/await everywhere // and properly handle errors.

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
