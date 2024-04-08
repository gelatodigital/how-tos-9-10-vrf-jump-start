import { run } from "hardhat";

async function main() {
  const contractAddress = "0x79eBe263CB1Def13AF5aA2fFaF9baf25dc3b11c7";
  const constructorArgs = ["0xa55e7F0dD850C5353025d3cFA5a36e648635a256"];

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: constructorArgs,
    });
    console.log("Contract verified successfully");
  } catch (error) {
    if ((error as Error).message.toLowerCase().includes("already verified")) {
      console.log("Contract is already verified");
    } else {
      console.error("Contract verification failed:", error);
    }
  }
}
main().catch((error) => {
  console.error("Verification script failed:", error);
  process.exit(1);
});
