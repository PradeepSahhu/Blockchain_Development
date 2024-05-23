// import
// const fs = require("fs")
// const { ethers } = require("ethers")
const hre = require("hardhat")

// abi, binary, wallet

async function main() {
    //**************** Previously by using ethers ************* */
    // const abi = fs.readFileSync("./")
    // const binary = fs.readFileSync("./")
    // const provider = await ethers.JsonRpcApiProvider("http:127.0.0.1:7545")
    // const wallet = await ethers.Wallet("private key", provider)
    // const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    // const contract = await contractFactory.deploy()
    // await contract.waitForDeployment()
    // transactionReceipt = contract.deploymentTrasaction().wait(1);

    //*********By using hardhat-ethers******** */
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // provider.getSigners()

    // const [owner, addr1] = await ethers.getSigners()

    // console.log(owner.address)
    // console.log(addr1.address)

    const simpleStorageFactory = await hre.ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract........")
    const simpleStorageContract = await simpleStorageFactory.deploy()

    console.log(await simpleStorageContract.getAddress())

    // console.log(await simpleStorageContract.getPeopleInfoLength())

    // await simpleStorageContract.addData("Pradeep", 21, false)
    // await simpleStorageContract.addData("Ritkk", 22, false)
    // console.log(await simpleStorageContract.getPeopleInfoLength())
    // console.log(await simpleStorageContract.displayAllData("Pradeep"))

    //what's private key
    // what the rpc url?
}

async function verify(contractAddress, args) {}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
