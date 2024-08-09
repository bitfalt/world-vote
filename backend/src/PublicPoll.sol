// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract PublicPoll {
    address public owner;
    mapping(string => uint) public votes;
    mapping(bytes32 => bool) public nullifiers;

    event Vote(address voter, string option);

    constructor() {
        owner = msg.sender;
    }
 
   function castVote(string memory _option, bytes32 _nullifier) public {
        // Check if the user hasn't voted already
        require(!_checkNullifier(_nullifier));
        votes[_option] += 1;
        emit Vote(msg.sender, _option);
   }

   function _checkNullifier(bytes32 _nullifier) internal view returns (bool) {
        return nullifiers[_nullifier];
   }
}
