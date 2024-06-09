require("dotenv").config();

const hre = require("hardhat");

async function main() {
    const simpleStorageFactory = await hre.ethers.getContractFactory("SimpleStorage");
    console.log("Deploying contract........");
    const simpleStorageContract = await simpleStorageFactory.deploy();
    await simpleStorageContract.deployed();
    console.log("Contract deployed at:", simpleStorageContract.address);

    try {
        let peopleLength = await simpleStorageContract.getPeopleInfoLength();
        console.log(`Current value is: ${peopleLength}`);

        let tx = await simpleStorageContract.addData("Pradeep", 21, false);
        await tx.wait();
        tx = await simpleStorageContract.addData("Ritik", 20, false);
        await tx.wait();

        console.log(await simpleStorageContract.getDetails("Pradeep"));

        let updatedPeopleLength = await simpleStorageContract.getPeopleInfoLength();
        console.log(`Updated value is: ${updatedPeopleLength}`);
    } catch (error) {
        console.error("Error interacting with the contract:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

