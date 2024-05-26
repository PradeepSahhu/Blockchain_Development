// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

// import {Play} from"./Experiment.sol";

// EVM - Ethereum virtual machine. (compiled smart contract)
// EVM compatiple blockchains , Avalanche, Fantom, polygon.

contract SimpleStorage {
    //storage state variables. permenant variables that can be modified.
    int public data;
    string public sName;
    uint256 public age;
    // Play ex;
    address public deployedContractAddress;

    // constructor(int _data, string memory _sName) {
    //     data = _data;
    //     sName = _sName;
    // }

    //Struct
    struct People {
        string name;
        uint256 age;
        bool married;
    }

    //Array.
    People[] public peopleInfo;

    //Mappping (dictionary)
    mapping(string => uint256) public peopleData;

    //callData, memory -> variable exist temporary & Storage -> permenant storage (state variables)

    function addData(
        string memory _peopleName,
        uint256 _age,
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

    function getPeopleInfoLength() public view returns (uint256) {
        return peopleInfo.length;
    }

    function setData(string memory _sName, uint256 _age) public virtual {
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

    function getInfo(
        string memory _name
    ) external pure returns (string memory) {
        return _name;
    }

    function getDetails(string memory _name) public view returns (uint256) {
        return peopleData[_name];
    }

    // we need to use memory for [ array, struct, and mappings ] (special types) string is byte arrays.

    function displayAllData(
        string memory _userData
    ) public view returns (uint256, People memory, string memory, uint256) {
        return (peopleData[_userData], People("Sumit", 30, true), "no data", 1);
    }
}
