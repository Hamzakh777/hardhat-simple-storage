const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    expect(currentValue.toString()).equal("0");
  });

  it("Should update when calling store", async function () {
    const expectedValue = "4";

    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    expect(currentValue.toString()).equal(expectedValue);
  });

  it("Should add a person", async function () {
    const transactionResponse = await simpleStorage.addPerson("meow", "1");
    await transactionResponse.wait(1);

    const person = await simpleStorage.people(0);
    expect(person.length).equal(2);

    const nameToFavoriteNumber = await simpleStorage.nameToFavoriteNumber(
      "meow"
    );
    expect(nameToFavoriteNumber.toString()).equal("1");
  });
});
