require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-ethers")
require("dotenv").config()
require("@nomicfoundation/hardhat-verify")
require("@nomicfoundation/hardhat-network-helpers")
require("./tasks/block-number")

const {
    SEPOLIA_ALCHEMY_APIKEY,
    METAMASK_SEPOLIA_PRIVATE_KEY,
    SEPOLIA_ALCHEMY_RPC_URL,
    ETHERSCAN_API_KEY,
} = process.env

// const { vars } = require("hardhat/config")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    solidity: "0.8.24",
    networks: {
        hardhat: {},
        sepolia: {
            url: `${SEPOLIA_ALCHEMY_RPC_URL}`,
            accounts: [`0x${METAMASK_SEPOLIA_PRIVATE_KEY}`],
            chainId: 11155111,
        },
        localhost: {
            url: "http://localhost:8545",
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    sourcify: {
        enabled: false,
    },
}

//EtherScanAPI KEY: 7FBCFGAJ9K3G57VRTBUDTQPJTDEIPIXQ2D
