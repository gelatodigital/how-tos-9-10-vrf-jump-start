import { ethers } from "hardhat";
import { SimpleCLVRFContract__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const contractAddress = "0x99fd72B02223CB9bb879d1a7aFf4e756B4B79A3C";
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
  const number = 5;
  console.log(`Requesting randomness with data: ${number}`);
  const tx = await vrfContract.requestRandomWords();
  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
