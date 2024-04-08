import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

// Process Env Variables
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.19",

  namedAccounts: {
    deployer: {
      default: 0,
    },
  },

  defaultNetwork: "hardhat",

  networks: {
    hardhat: {
      forking: {
        url: `https://eth-sepolia.g.alchemy.com/v2/tdlRFhX6HRYC-q7paO9WNc3NpIIRetC3`,
        blockNumber: 80000,
      },
    },

    blastSepolia: {
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 2131256,
      url: `https://sepolia.blast.io`,
    },

    ethsepolia: {
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 11155111,
      url: `https://eth-sepolia.g.alchemy.com/v2/tdlRFhX6HRYC-q7paO9WNc3NpIIRetC3`,
    },

    matic: {
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 137,
      url: `https://polygon-mainnet.g.alchemy.com/v2/KmPNhPyvGUUNah6nRGDCCLDSo8pMPNuq`,
    },
  },
  etherscan: {
    apiKey: process.env.POLYGON_API_KEY,
  },
};

export default config;
