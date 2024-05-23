const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const { expect } = require("chai");

describe("Token contract", function () {
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const contract = await ethers.deployContract("Token");

    return { owner, addr1, addr2, contract };
  }
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const { owner, contract } = await loadFixture(deployTokenFixture);

    const ownerBalance = await contract.balanceOf(owner.address);
    expect(await contract.totalSupply()).to.equal(ownerBalance);
  });

  it("Checking able to transfer ethers to other accounts", async function () {
    const { owner, addr1, addr2, contract } = await loadFixture(
      deployTokenFixture
    );

    await contract.transfer(addr1.address, 50);
    expect(await contract.balanceOf(addr1.address)).to.equal(50);

    await contract.connect(addr1).transfer(addr2, 50);

    expect(await contract.balanceOf(addr2.address)).to.equal(50);
  });

  it("should be able to transfer balance between accounts", async function () {
    const { owner, addr1, addr2, contract } = await loadFixture(
      deployTokenFixture
    );

    await expect(contract.transfer(addr1.address, 50)).to.changeTokenBalances(
      contract,
      [owner, addr1],
      [-50, 50]
    );
  });
});
