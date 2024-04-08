// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;
import "@openzeppelin/contracts/access/Ownable.sol";
import { VRFCoordinatorV2AdapterInterface } from "./IVRFCoordinatorV2Adapter.sol";

contract SimpleVRFCLContract is  Ownable {
    bytes32 public latestRandomness;
    uint256 public lastRequestId;

    VRFCoordinatorV2AdapterInterface public vrfCoordinator;

    constructor(address adapterAddress) {
        vrfCoordinator = VRFCoordinatorV2AdapterInterface(adapterAddress);
    }

    // If your contract already deployed and has a function to update the coordinator
    function setVRFAdapter(address newAdapterAddress) external onlyOwner {
        _setVRFAdapter(newAdapterAddress);
    }

    // Internal function to update the adapter address
    function _setVRFAdapter(address newAdapterAddress) internal {
        vrfCoordinator = VRFCoordinatorV2AdapterInterface(newAdapterAddress);
    }

    function requestRandomWords(uint32 numWords) external {
        bytes32 keyHash = 0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;
        lastRequestId = vrfCoordinator.requestRandomWords(keyHash, 0, 3, 0, numWords);
    }

    function fulfillRandomWords(bytes32 requestId, bytes32 randomness) external {
        require(msg.sender == address(vrfCoordinator), "Only VRFCoordinator can fulfill");
        latestRandomness = randomness;
    }
}