const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")

const SimpleStorageModule = buildModule("SimpleStorageModule", (m) => {
    const token = m.contract("SimpleStorage")

    return { token }
})

module.exports = SimpleStorageModule
