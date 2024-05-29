const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")

const DaoRegistrationFac = buildModule("DaoRegistrationFactoryModule", (m) => {
    const token = m.contract("DaoRegistractionFactory")

    return { token }
})

module.exports = DaoRegistrationFac
