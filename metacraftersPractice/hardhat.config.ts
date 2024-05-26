import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config()

const {
    SEPOLIA_ALCHEMY_APIKEY,
    METAMASK_SEPOLIA_PRIVATE_KEY,
    INFURA_RPC_URL,
    ETHERSCAN_API_KEY,
} = process.env

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks:{
    sepolia:{
      url: `${INFURA_RPC_URL}`,
      accounts: [`0x${METAMASK_SEPOLIA_PRIVATE_KEY}`]
    }
  }
};

export default config;


// require("dotenv").config()
// require("@nomicfoundation/hardhat-verify")

// const {
//     SEPOLIA_ALCHEMY_APIKEY,
//     METAMASK_SEPOLIA_PRIVATE_KEY,
//     SEPOLIA_ALCHEMY_RPC_URL,
//     ETHERSCAN_API_KEY,
// } = process.env

// // const { vars } = require("hardhat/config")

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//     defaultNetwork: "hardhat",
//     solidity: "0.8.24",
//     networks: {
//         hardhat: {},
//         sepolia: {
//             url: `${SEPOLIA_ALCHEMY_RPC_URL}`,
//             accounts: [`0x${METAMASK_SEPOLIA_PRIVATE_KEY}`],
//             chainId: 11155111,
//         },
//     },
//     etherscan: {
//         apiKey: ETHERSCAN_API_KEY,
//     },
//     sourcify: {
//         enabled: false,
//     },
// }


// SEPOLIA_ALCHEMY_APIKEY=KVaQSUxSUckVUkXHoztBh9bEJtnw0cfx
// SEPOLIA_ALCHEMY_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/KVaQSUxSUckVUkXHoztBh9bEJtnw0cfx

// METAMASK_SEPOLIA_PRIVATE_KEY=c4afff5af0204c8a8e653a3641cda0442aad699eaa6f37876a8e8152be3f69e1

// ETHERSCAN_API_KEY=7FBCFGAJ9K3G57VRTBUDTQPJTDEIPIXQ2D