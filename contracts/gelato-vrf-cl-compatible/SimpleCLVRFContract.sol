// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

//the line below disables the solc linter for the whole file
/* solhint-disable */

import "./VRFConsumerBaseV2.sol";
import "./VRFCoordinatorV2Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleCLVRFContract is VRFConsumerBaseV2, Ownable {
    VRFCoordinatorV2Interface COORDINATOR;

    // Your subscription ID.
    uint64 s_subscriptionId = 1002;

    // Sepolia coordinator. For other networks,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    address localVrfCoordinator = 0xAE975071Be8F8eE67addBC1A82488F1C24858067;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    bytes32 s_keyHash =
        0xcc294a196eeeb44da2888d17c0625cc88d70d9760a69d58d853ba6581a9ab0cd;

    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
    // so 40,000 is a safe default for this example contract. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 callbackGasLimit = 300000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // For this example, retrieve 5 random value in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 numWords = 5;

    uint256 public requestId;
    struct Request {
        uint256 requestTime;
        uint256 requestBlock;
        uint256 fulfilledTime;
        uint256 fulfilledBlock;
        uint256 randomness;
    }

    event RandomnessFulfilled(uint256 indexed nonce, Request);

    uint256 public nonce;
    mapping(uint256 => Request) public requests;

    constructor() VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
    }

    function requestRandomWords() external {
        _requestRandomWords();
    }

    function _requestRandomWords() private {
        requestId = COORDINATOR.requestRandomWords(
            s_keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        nonce += 1;
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        uint256 d20Value = (randomWords[0] % 20) + 1;
        Request memory request = Request(
            block.timestamp,
            block.number,
            block.timestamp,
            block.number,
            randomWords[0]
        );

        requests[block.number] = request;

        emit RandomnessFulfilled(block.number, request);
    }

    function setCoordinator(address _vrfCoordinator) external onlyOwner {
        setVRFCoordinator(_vrfCoordinator);
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
    }

    //Setter for numWords
    function setNumWords(uint32 _numWords) external onlyOwner {
        numWords = _numWords;
    }
}
