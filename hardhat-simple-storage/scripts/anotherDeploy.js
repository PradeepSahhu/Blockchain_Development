// import
// const fs = require("fs")
// const { ethers } = require("ethers")
const hre = require("hardhat")

// abi, binary, wallet

async function main() {
    //**************** Previously by using ethers.js ************* */
    // const abi = fs.readFileSync("./")
    // const binary = fs.readFileSync("./")
    // const provider = await ethers.JsonRpcApiProvider("http:127.0.0.1:7545")
    // const wallet = await ethers.Wallet("private key", provider)
    // const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    // const contract = await contractFactory.deploy()
    // await contract.waitForDeployment()
    // transactionReceipt = contract.deploymentTrasaction().wait(1);

    //*********By using hardhat-ethers******** */

    // provider.getSigners()

    // const [owner, addr1] = await ethers.getSigners()

    // console.log(owner.address)
    // console.log(addr1.address)

    const advanceSimpleFactory =
        await hre.ethers.getContractFactory("simpleStorage")
    const advanceSimple = await advanceSimpleFactory.deploy()
    // advanceSimple.deployed()
    // console.log(advanceSimple)

    const contractAddress = await advanceSimple.getAddress()

    console.log(contractAddress)

    advanceSimple.waitForDeployment(10)

    //what happens when we deploy to our hardhat network

    console.log(await simpleStorageContract.getPeopleInfoLength())

    await simpleStorageContract.addData("Pradeep", 21, false)
    await simpleStorageContract.addData("Ritkk", 22, false)
    console.log(await simpleStorageContract.getPeopleInfoLength())
    console.log(await simpleStorageContract.displayAllData("Pradeep"))

    console.log(
        `The remaining balance is : ${await hre.ethers.provider.getBalance()}`,
    )

    //what's private keymy
    // what the rpc url?
    // console.log(hre.network.config)
    // if (
    //     hre.network.config.chainId === 11155111 &&
    //     process.env.ETHERSCAN_API_KEY
    // ) {
    //     await simpleStorageContract.waitForDeployment(3) // waiting for three blocks to be added after that i will initiate verify function.
    //     await verify(contractAddress, [])
    // }

    // //Interacting with contracts (calling its functions.)
    // var value = await simpleStorageContract.getPeopleInfoLength()
    // console.log(`Current value is : ${parseInt(value)}`)

    // await simpleStorageContract.addData("Pradeep", "21", false)
    // simpleStorageContract.waitForDeployment(1)
    // await simpleStorageContract.addData("Ritik", "20", false)
    // simpleStorageContract.waitForDeployment(1)

    // var data = await simpleStorageContract.getDetails("Pradeep")
    // console.log(parseInt(data))
    // let UpdatedpeopleLength = await simpleStorageContract.getPeopleInfoLength()
    // console.log(`Updated value is : ${parseInt(UpdatedpeopleLength)}`)

    // peopleLength = await simpleStorageContract.getPeopleInfoLength()

    // console.log(`Current value is : ${peopleLength}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying Contract....")

    try {
        await hre.run("verify:verify", {
            address: contractAddress,
            contructorArguments: args,
        })

        console.log("Contract is verified")
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Contract is already verified")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
