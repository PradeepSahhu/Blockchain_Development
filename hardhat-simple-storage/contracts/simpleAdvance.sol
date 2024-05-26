// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract simpleAdvance {
    uint storedNumber;
    address ownwerAddress;
    address contractAddress;

    mapping(address => bool) whiteList;

    mapping(address => uint) contributions;

    address[] public payed;

    constructor() {
        ownwerAddress = msg.sender;
        whiteList[ownwerAddress] = true;
    }

    // modifiers

    modifier requireWhiteList() {
        require(
            whiteList[msg.sender],
            "You are not in whiteList can't withdraw"
        );
        _;
    }

    modifier onlyOnwer() {
        require(msg.sender == ownwerAddress, "you are not contract owner");
        _;
    }

    // contract functions.

    function getPayed() public view returns (address[] memory) {
        return payed;
    }

    function writeNum(uint _num) public {
        storedNumber = _num;
    }

    function readNum() public view returns (uint) {
        return storedNumber;
    }

    function doingWhiteList(uint _index) public onlyOnwer {
        whiteList[payed[_index]] = true;
    }

    // to get balance this contract holds.
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function Paying() public payable {
        if (contributions[msg.sender] == 0) {
            contributions[msg.sender] = msg.value;
            payed.push(msg.sender);
        } else {
            contributions[msg.sender] += msg.value;
        }
    }

    function withDraw() public payable requireWhiteList {
        (bool callMsg, ) = payable(msg.sender).call{
            value: contributions[msg.sender]
        }("");

        require(callMsg, "unsuccessful");
    }

    receive() external payable {}

    fallback() external payable {}
}
