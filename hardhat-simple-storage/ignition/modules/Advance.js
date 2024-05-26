const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")

const AdvanceModule = buildModule("simpleAdvanceModule", (m) => {
    const token = m.contract("simpleAdvance")

    return { token }
})

module.exports = AdvanceModule
