import { ethers } from "hardhat";
import { SimpleCLVRFContract__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const contractAddress = "0xe3689ABC2F6648BA8be68cE41620988C4e2708bd";
  const PRIVATE_KEY = process.env.PRIVATE_KEY;

  if (!PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set");
  }

  // Get local Hardhat wallet
  const [wallet] = await ethers.getSigners();

  // Connect to the contract using the local wallet
  const vrfContract = SimpleCLVRFContract__factory.connect(
    contractAddress,
    wallet
  );

  // Request randomness
  // const data = ethers.utils.formatBytes32String("test data"); // Use formatBytes32String instead of encodeBytes32String
  const coordinator = "0x63d545B90427401548807Ee274EDE17fB616dD5B";
  const tx = await vrfContract.setCoordinator(coordinator);
  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
