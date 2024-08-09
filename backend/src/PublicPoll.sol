// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract PublicPoll {
    address public owner;
    mapping(string => uint) public votes;

    event Vote(address voter, string option);

    constructor() {
        owner = msg.sender;
    }
 
   function castVote(string memory _option) public {
        votes[_option] += 1;
        emit Vote(msg.sender, _option);
   }
}
