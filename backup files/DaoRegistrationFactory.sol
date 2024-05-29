// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract DaoRegistractionFactory {
    address[] deployedContract;
    mapping(address => string) organizationName;

    constructor() {}

    function Registration(
        string memory _organizationToken,
        string memory _tokenSymbol,
        string memory _orgName
    ) public {
        address newContract = address(
            new DaoRegistration(_organizationToken, _tokenSymbol, msg.sender)
        );

        deployedContract.push(newContract);
        organizationName[newContract] = _orgName;
    }

    function getAllDeployedContract() public view returns (address[] memory) {
        return deployedContract;
    }

    function getNameOfOrganizations(
        address _contractAddress
    ) public view returns (string memory) {
        return organizationName[_contractAddress];
    }
}

contract DaoRegistration {
    string public organizationToken;
    string public tokenSymbol;
    address public immutable owner;

    // for contant data.
    mapping(address => bool) public whiteListedStackHolders;
    mapping(address => uint) public contributorsAmount;
    mapping(address => uint) public stakeHolderType;
    mapping(address => uint) public presentStakeHolder;
    mapping(address => stackHolder) public stakeHolderDetails;
    mapping(address => uint) public vastingData;

    address[] public stakeHolderAddresses;
    stackHolder[] public stakeHolders;

    struct stackHolder {
        address stakeHolderAddress;
        uint8 hisType; // 0 - founder , 1- pre_sale_buyer , 2 - investors , 3 - community
        uint256 stakesHold;
        uint boughtDate;
    }

    constructor(
        string memory _organizationToken,
        string memory _tokenSymbol,
        address _owner
    ) {
        owner = _owner;
        organizationToken = _organizationToken;
        tokenSymbol = _tokenSymbol;
        whiteListedStackHolders[owner] = true;
    }

    // modifiers

    modifier onlyNew(address _contriAddress) {
        require(
            presentStakeHolder[_contriAddress] == 0,
            "you are already present in the list"
        );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "you are not the owner");
        _;
    }

    modifier whiteListed() {
        require(
            whiteListedStackHolders[msg.sender] == true,
            "You are not white-listed stake holder"
        );
        _;
    }

    // modifier timeLock(uint vesting) {
    //     require(
    //         vesting <= vastingData[msg.sender] + stakeHolderType[msg.sender],
    //         "Your Vasting Period is not met"
    //     );
    //     _;
    // }
    modifier timeLock(uint vesting) {
        require(
            vastingData[msg.sender] <= vesting,
            "Your Vasting Period is not met"
        );
        _;
    }

    //getters

    function getAllStackHolder() public view returns (stackHolder[] memory) {
        return stakeHolders;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getTypeOfStackHolder(
        address _contriddress
    ) public view returns (uint) {
        return stakeHolders[presentStakeHolder[_contriddress]].hisType;
    }

    function isWhiteListed(address _address) public view returns (bool) {
        return whiteListedStackHolders[_address];
    }

    function getContributorsAmount(
        address _address
    ) public view returns (uint256) {
        return contributorsAmount[_address];
    }

    function getPresentStakeHolder(
        address _address
    ) public view returns (uint256) {
        return presentStakeHolder[_address];
    }

    function getStakeHolderAddresses() public view returns (address[] memory) {
        return stakeHolderAddresses;
    }

    // functionality

    function addingStackHolder(
        address _contributor,
        uint8 _hisType,
        uint256 _amount,
        uint256 _date
    ) public onlyNew(_contributor) {
        stackHolder memory newStakeHolder = stackHolder(
            _contributor,
            _hisType,
            _amount,
            _date
        );
        stakeHolders.push(newStakeHolder);

        // address mapping for constant operations.
        stakeHolderDetails[_contributor] = newStakeHolder;
        presentStakeHolder[_contributor] = stakeHolders.length;
        contributorsAmount[_contributor] = _amount;
        stakeHolderAddresses.push(_contributor); // adding stake holder address.
        vastingData[_contributor] = _date;
        stakeHolderType[_contributor] = _hisType;
    }

    //not correct.
    // function whiteListing(uint256 _index) public onlyOwner{
    //     require(!whiteListedStackHolders[stakeHolders[_index].stakeHolderAddress], "You are already white listed");
    //    whiteListedStackHolders[stakeHolders[_index].stakeHolderAddress] = true;

    // }
    function whiteListing(address _address) public onlyOwner {
        require(
            whiteListedStackHolders[_address] == false,
            "You are already white listed"
        );
        require(
            presentStakeHolder[_address] > 0,
            " you are present in the list"
        );
        whiteListedStackHolders[_address] = true;
    }

    // HERE TOKEN = ETHERS in (Wei)
    // Instead of sending ERC-20 Token i am allowing them to withdraw certain amount from the contract

    function sendToken() public payable onlyOwner {}

    function pseduoWithDrawTokens() public payable whiteListed {
        uint transferAmount = contributorsAmount[msg.sender];

        if (msg.sender == owner) {
            transferAmount = address(this).balance;
        }

        (bool callMsg, ) = payable(msg.sender).call{value: transferAmount}("");

        require(callMsg, "unsuccesful");

        whiteListedStackHolders[msg.sender] = false;
        if (msg.sender != owner) {
            contributorsAmount[msg.sender] = 0;
            presentStakeHolder[msg.sender] = 0;
            delete stakeHolderDetails[msg.sender];
            vastingData[msg.sender] = 0;
            delete stakeHolderAddresses[presentStakeHolder[msg.sender]];
            delete stakeHolders[presentStakeHolder[msg.sender]];
        }

        //     delete stakeHolders[presentStakeHolder[msg.sender]];

        //    whiteListedStackHolders[msg.sender] = false;
    }

    function withDrawTokens(
        uint vastingTime
    ) public payable whiteListed timeLock(vastingTime) {
        uint transferAmount = contributorsAmount[msg.sender];

        if (msg.sender == owner) {
            transferAmount = address(this).balance;
        }

        (bool callMsg, ) = payable(msg.sender).call{value: transferAmount}("");

        require(callMsg, "unsuccesful");

        whiteListedStackHolders[msg.sender] = false;
        if (msg.sender != owner) {
            contributorsAmount[msg.sender] = 0;
            presentStakeHolder[msg.sender] = 0;
            delete stakeHolderDetails[msg.sender];
            vastingData[msg.sender] = 0;
            delete stakeHolderAddresses[presentStakeHolder[msg.sender]];
            delete stakeHolders[presentStakeHolder[msg.sender]];
        }
    }

    // such that this contract can receive money externally with only contract address.

    receive() external payable {}

    fallback() external payable {}
}
