const { task } = require("hardhat/config")

task(
    "blockNumber",
    "To get the block number of deployed contract",
    async (taskArgs, hre) => {
        // const simpleStorageFactory =
        //     await hre.ethers.getContractFactory("SimpleStorage")
        // const simpleStorageContract = await simpleStorageFactory.deploy()
        // // simpleStorageContract.deployed()
        // // console.log(simpleStorageContract)

        // const contractAddress = await simpleStorageContract.getAddress()

        // console.log(contractAddress)

        // simpleStorageContract.waitForDeployment(1)

        const latestBlock = await hre.ethers.provider.getBlockNumber()

        // const blockNum = await simpleStorageContract.getBlock
        console.log(latestBlock)
    },
)
module.exports = {}
