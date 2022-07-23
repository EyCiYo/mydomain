const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("eyciyo");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of Alexanders lol
  let txn = await domainContract.register("Alexander",  {value: hre.ethers.utils.parseEther('0.001')});
  await txn.wait();
  console.log("Minted domain Alexander.eyciyo");

  txn = await domainContract.setRecord("Alexander", "Am I a Alexander or a eyciyo??");
  await txn.wait();
  console.log("Set record for Alexander.eyciyo");

  const address = await domainContract.getAddress("Alexander");
  console.log("Owner of domain Alexander:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();