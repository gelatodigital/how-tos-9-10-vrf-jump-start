import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const SimpleVRFContract = await ethers.getContractFactory(
    "SimpleVRFContract"
  );
  const simpleVRF = await SimpleVRFContract.deploy(
    "0xa55e7F0dD850C5353025d3cFA5a36e648635a256"
  );
  await simpleVRF.waitForDeployment();

  console.log("SimpleVRFContract deployed to:", await simpleVRF.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
