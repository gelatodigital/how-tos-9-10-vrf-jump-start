import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const SimpleVRFContract = await ethers.getContractFactory(
    "SimpleVRFCLContract"
  );
  const simpleVRF = await SimpleVRFContract.deploy(
    "0x0616d765019aa11ec5a50e2aeA0e371b064c64f0"
  );
  await simpleVRF.waitForDeployment();

  console.log("SimpleVRFContract deployed to:", await simpleVRF.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
