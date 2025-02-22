const hre = require("hardhat");

async function main() {
  // Get the ContractFactory for "Report"
  const ReportFactory = await hre.ethers.getContractFactory("Report");
  
  // Deploy the contract
  const Report = await ReportFactory.deploy();

  // Wait for the deployment to be mined
  await Report.deployed();

  // Log the address of the deployed contract
  console.log("Deployed contract address:", Report.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});