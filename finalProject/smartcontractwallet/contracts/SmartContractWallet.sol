// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

/* solhint-disable avoid-low-level-calls */
/* solhint-disable no-inline-assembly */
/* solhint-disable reason-string */

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
// import "@account-abstraction/=lib/account-abstraction/develop/contracts/core/BaseAccount.sol";
import "../account-abstraction/contracts/core/BaseAccount.sol";
import "../account-abstraction/contracts/core/Helpers.sol";

// import "https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/core/BaseAccount.sol";
// import "https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/core/Helpers.sol";

/**
 * minimal account.
 *  this is sample minimal account.
 *  has execute, eth handling methods
 *  has a single signer that can send requests through the entryPoint.
 */
contract SmartContractWallet is BaseAccount, UUPSUpgradeable, Initializable {
    address public owner;

    IEntryPoint private immutable _entryPoint;
    bytes32 private password;

    event SimpleAccountInitialized(
        IEntryPoint indexed entryPoint,
        address indexed owner
    );

    modifier onlyOwner() {
        _onlyOwner();
        _;
    }

    /// @inheritdoc BaseAccount
    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
    }

    // solhint-disable-next-line no-empty-blocks
    receive() external payable {}

    constructor(IEntryPoint anEntryPoint) {
        _entryPoint = anEntryPoint;
        _disableInitializers();
    }

    function _onlyOwner() internal view {
        //directly from EOA owner, or through the account itself (which gets redirected through execute())
        require(
            msg.sender == owner || msg.sender == address(this),
            "only owner"
        );
    }

    function setPassword(string memory _password) public onlyOwner {
        password = keccak256(abi.encode(_password));
    }

    function login(string memory _data) internal view returns (bool) {
        bytes32 message = keccak256(abi.encode(_data));
        require(message == password, "You are not the owner");
        return true;
    }

    function changeOwner(string memory _password) public {
        bool res = login(_password);
        require(res, "You are not authorized");
        owner = msg.sender;
    }

    function checkAddress() public view returns (address) {
        return address(this);
    }

    function checkBalance() public view returns (uint) {
        return address(this).balance;
    }

    function transferTo(address _transferTo, uint amount) public {
        (bool callMsg, ) = _transferTo.call{value: amount}("");
        require(callMsg, "Transfer unsuccessfull");
    }

    /**
     * execute a transaction (called directly from owner, or by entryPoint)
     * @param dest destination address to call
     * @param value the value to pass in this call
     * @param func the calldata to pass in this call
     */
    // function execute(address dest, uint256 value, bytes calldata func) external {
    //     _requireFromEntryPointOrOwner();
    //     _call(dest, value, func);
    // }

    /**
     * execute a sequence of transactions
     * @dev to reduce gas consumption for trivial case (no value), use a zero-length array to mean zero value
     * @param dest an array of destination addresses
     * @param value an array of values to pass to each call. can be zero-length for no-value calls
     * @param func an array of calldata to pass to each call
     */
    // function executeBatch(address[] calldata dest, uint256[] calldata value, bytes[] calldata func) external {
    //     _requireFromEntryPointOrOwner();
    //     require(dest.length == func.length && (value.length == 0 || value.length == func.length), "wrong array lengths");
    //     if (value.length == 0) {
    //         for (uint256 i = 0; i < dest.length; i++) {
    //             _call(dest[i], 0, func[i]);
    //         }
    //     } else {
    //         for (uint256 i = 0; i < dest.length; i++) {
    //             _call(dest[i], value[i], func[i]);
    //         }
    //     }
    // }

    /**
     * @dev The _entryPoint member is immutable, to reduce gas consumption.  To upgrade EntryPoint,
     * a new implementation of SimpleAccount must be deployed with the new EntryPoint address, then upgrading
     * the implementation by calling `upgradeTo()`
     * @param anOwner the owner (signer) of this account
     */
    function initialize(address anOwner) public virtual initializer {
        _initialize(anOwner);
    }

    function _initialize(address anOwner) internal virtual {
        owner = anOwner;
        emit SimpleAccountInitialized(_entryPoint, owner);
    }

    // Require the function call went through EntryPoint or owner
    function _requireFromEntryPointOrOwner() internal view {
        require(
            msg.sender == address(entryPoint()) || msg.sender == owner,
            "account: not Owner or EntryPoint"
        );
    }

    /// implement template method of BaseAccount
    function _validateSignature(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash
    ) internal virtual override returns (uint256 validationData) {
        bytes32 hash = MessageHashUtils.toEthSignedMessageHash(userOpHash);
        if (owner != ECDSA.recover(hash, userOp.signature))
            return SIG_VALIDATION_FAILED;
        return SIG_VALIDATION_SUCCESS;
    }

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    // /**
    // //  * check current account deposit in the entryPoint
    // //  */
    // function getDeposit() public view returns (uint256) {
    //     return entryPoint().balanceOf(address(this));
    // }

    // /**
    //  * deposit more funds for this account in the entryPoint
    //  */
    // function addDeposit() public payable {
    //     entryPoint().depositTo{value: msg.value}(address(this));
    // }

    // /**
    //  * withdraw value from the account's deposit
    //  * @param withdrawAddress target to send to
    //  * @param amount to withdraw
    //  */
    // function withdrawDepositTo(address payable withdrawAddress, uint256 amount) public onlyOwner {
    //     entryPoint().withdrawTo(withdrawAddress, amount);
    // }

    function _authorizeUpgrade(
        address newImplementation
    ) internal view override {
        (newImplementation);
        _onlyOwner();
    }
}
// 0x0576a174D229E3cFA37253523E645A78A0C91B57 --sepolia entrypoint address.

//0xE7bDf59815d5d7Dd614DDEd60d320Ff40976a6F8
//0x7f5FEC2de75BE334138acD655Cf0aF44951813d8 - contract Address.
