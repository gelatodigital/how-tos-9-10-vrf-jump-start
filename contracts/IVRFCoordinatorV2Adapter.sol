// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {VRFConsumerBaseV2} from "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

interface VRFCoordinatorV2AdapterInterface {
    function requestRandomWords(
        bytes32 keyHash,
        uint64 subId,
        uint16 minimumRequestConfirmations,
        uint32 callbackGasLimit,
        uint32 numWords
    ) external returns (uint256 requestId);

    function requestRandomWordsForConsumer(
        bytes32 keyHash,
        uint64 subId,
        uint16 minimumRequestConfirmations,
        uint32 callbackGasLimit,
        uint32 numWords,
        VRFConsumerBaseV2 consumer
    ) external returns (uint256 requestId);

    function updateRequesterPermissions(
        address[] memory requesters,
        bool newCanRequest
    ) external;
}