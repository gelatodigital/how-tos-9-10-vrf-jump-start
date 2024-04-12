# How To #10 on Gelato: VRF Walkthrough

This repository provides example contracts and instructions for setting up Verifiable Random Function (VRF) on Gelato, utilizing both Gelato VRF and Gelato VRF (Chainlink Compatible).

[![Video Walkthrough](https://img.youtube.com/vi/cUPjQYoH2OE/0.jpg)](https://youtu.be/cUPjQYoH2OE)

<img src="docs/vrf.png" width="500"/>

## Overview

Verifiable Random Function (VRF) is a cryptographic primitive that generates unpredictable random numbers. Integrating VRF into Gelato allows for various decentralized applications (DApps) to leverage secure, on-chain randomness.

This repository includes contracts and configurations necessary for implementing VRF functionality on Gelato, making it easy for developers to integrate random number generation into their projects.

## Contracts

There are two types of VRF contracts available in this repository:

1. Gelato VRF
2. Gelato VRF (Chainlink Compatible)

> [!NOTE]  
> Check the deployed addresses for each network in the deployments folder.

## Gelato VRF: `SimpleVRFContract`

- **Description**: Contract for using Gelato VRF directly.
- **Features**:
  - Requests randomness from Gelato VRF.
  - Handles the fulfillment of randomness.

## Gelato VRF (Chainlink Compatible): `SimpleVRFChainlinkCompatible`

- **Description**: Contract for using Gelato VRF with Chainlink VRF.
- **Features**:
  - Requests randomness from Gelato VRF.
  - Handles the fulfillment of randomness.
  - Converts Chainlink VRF response to Gelato VRF response.

> [!IMPORTANT]  
> Make sure that the `vrfCoordinator` address can be set after the contract has been deployed. This can be done by making the vrfCoordinator non-immutable as follows:
> `address public vrfCoordinator;`
> Ensure you've configured the deployed adapter from the task as the `vrfCoordinator`.

# Create a Gelato VRF Task

To create a Gelato VRF Task, please refer to the documentation [here](https://docs.gelato.network/web3-services/vrf/quick-start/deploying-your-vrf-instance).

To create a Gelato VRF Task with Chainlink compatibility, please refer to the documentation [here](https://docs.gelato.network/web3-services/vrf/migrating-from-chainlink-vrf).

## Monitor Execution

[Here](https://app.gelato.network/functions/task/0x18a91b0e2538c3848c415666a402efa3510d26367d5134d33e0d23bcff011197:88153591557?origin=vrf) is an example task from the app that shows the fullfilled randomness

![Gelato VRF Task](./assets/gelato-vrf-task.png)
