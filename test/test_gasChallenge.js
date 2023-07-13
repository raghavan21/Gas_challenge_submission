const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Deploy Gas Challenge Contract", () => {
  let gas_contract;

  beforeEach(async () => {
    const gas_challenge_contract = await ethers.getContractFactory(
      "gasChallenge"
    );
    gas_contract = await gas_challenge_contract.deploy();
  });

  describe("Compute Gas", () => {
    it("Should return lower gas", async () => {
      const tx_not_optimized = await gas_contract.notOptimizedFunction();
      const tx_optimized = await gas_contract.optimizedFunction();
      const receipt_not_optimized = await tx_not_optimized.wait();
      const receipt_optimized = await tx_optimized.wait();
      const gas_not_optimized = receipt_not_optimized.gasUsed;
      const gas_optimized = receipt_optimized.gasUsed;
      expect(gas_optimized).to.be.lessThan(gas_not_optimized);
    });
  });
  
  

  describe("Check Sum Of Array", () => {
    it("Should return 0", async () => {
      const sum_of_array_before = await gas_contract.getSumOfArray();
      console.log("Sum of array before:", sum_of_array_before.toNumber());
  
      await gas_contract.optimizedFunction();
  
      const sum_of_array_after = await gas_contract.getSumOfArray();
      console.log("Sum of array after:", sum_of_array_after.toNumber());
  
      expect(sum_of_array_after).to.equal(0);
    });
  });
});