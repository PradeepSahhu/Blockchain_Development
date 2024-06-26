// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// import {Play} from"./Experiment.sol";

// EVM - Ethereum virtual machine. (compiled smart contract)
// EVM compatiple blockchains , Avalanche, Fantom, polygon.

contract SimpleStorage {
    //storage state variables. permenant variables that can be modified.
    int public data;
    string public sName;
    uint public age;
    // Play ex;
    address public deployedContractAddress;

    // constructor(int _data, string memory _sName) {
    //     data = _data;
    //     sName = _sName;
    // }

    //Struct
    struct People {
        string name;
        uint age;
        bool married;
    }

    //Array.
    People[] public peopleInfo;

    //Mappping (dictionary)
    mapping(string => uint) public peopleData;

    //callData, memory -> variable exist temporary & Storage -> permenant storage (state variables)

    function addData(
        string memory _peopleName,
        uint _age,
        bool _isMarried
    ) public {
        //alternative of the above.
        People memory newPeople = People({
            name: _peopleName,
            age: _age,
            married: _isMarried
        });

        peopleInfo.push(newPeople);
        // peopleInfo.push(People(_peopleName,_age,_isMarried));

        peopleData[_peopleName] = _age;
    }

    function getPeopleInfoLength() public view returns (uint) {
        return peopleInfo.length;
    }

    function setData(string memory _sName, uint _age) public virtual {
        sName = _sName;
        age = _age;
    }

    // function deployContract() public{
    //       ex = new Play(21, "Pradeep");
    //      deployedContractAddress = address(ex);
    // }

    // function deployedContractData() public view {
    //     ex.displayAge();
    // }

    function getAddress() public view returns (address) {
        return deployedContractAddress;
    }

    // we need to use memory for [ array, struct, and mappings ] (special types) string is byte arrays.

    function displayAllData(
        string memory _userData
    ) public view returns (uint, People memory, string memory, uint) {
        return (peopleData[_userData], People("Sumit", 30, true), "no data", 1);
    }
}
