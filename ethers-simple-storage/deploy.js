console.log("Executing...");

// const mainFunction = () => {
//   console.log("main function is executing  --> arrow function");
// };

//synchronous (one by one execution) ---> promise

//Asynchronous

// --- Promise ---

// Pending...
// Fulfilled...
// Rejected...

// Setup Movie Night
// Cook popcorn
// Pour Drinks
// Start Movie

// async function setUpMovieNight() {
//   await cookPopCorn();
//   await PourDrinks();
//   startMovie();
// }
// setUpMovieNight()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
// function cookPopCorn() {
//   return Promise();
// }
// setUpMovieNight();

// deploy a contract? wait for it to be deployed..
// contract.deploy ---> wouuldn't wait for it to finish

// async function foo() {
//   const result1 = await new Promise(
//     (resolve) => setTimeout(() => resolve("resolved"), 1000),
//     console.log("control is gone from here")
//   );
//   const result2 = await new Promise(
//     (resolve) => setTimeout(() => resolve("resolved2"), 100),
//     console.log("control2 is gone from here")
//   );
// }
// // foo();

// console.log("this is first before foo");
// foo();
// console.log("this is second before foo");
// console.log("this is third before foo");
// console.log("this is fourth before foo");
// console.log("this is fifth before foo");
// console.log("this is sixth before foo");
// console.log("this is seventh before foo");
// console.log("this is eigth before foo");
// console.log("this is ninth before foo");
// console.log("this is tenth before foo");

// function resolveAfter2Seconds() {
//   console.log("starting slow promise");
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("slow");
//       console.log("slow promise is done");
//     }, 2000);
//   });
// }

// function resolveAfter1Second() {
//   console.log("starting fast promise");
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("fast");
//       console.log("fast promise is done");
//     }, 1000);
//   });
// }

// async function sequentialStart() {
//   console.log("== sequentialStart starts ==");

//   // 1. Start a timer, log after it's done
//   const slow = resolveAfter2Seconds();
//   console.log(await slow);

//   // 2. Start the next timer after waiting for the previous one
//   const fast = resolveAfter1Second();
//   console.log(await fast);

//   console.log("== sequentialStart done ==");
// }

// async function sequentialWait() {
//   console.log("== sequentialWait starts ==");

//   // 1. Start two timers without waiting for each other
//   const slow = resolveAfter2Seconds();
//   const fast = resolveAfter1Second();

//   // 2. Wait for the slow timer to complete, and then log the result
//   console.log(await slow);
//   // 3. Wait for the fast timer to complete, and then log the result
//   console.log(await fast);

//   console.log("== sequentialWait done ==");
// }

// async function concurrent1() {
//   console.log("== concurrent1 starts ==");

//   // 1. Start two timers concurrently and wait for both to complete
//   const results = await Promise.all([
//     resolveAfter2Seconds(),
//     resolveAfter1Second(),
//   ]);
//   // 2. Log the results together
//   console.log(results[0]);
//   console.log(results[1]);

//   console.log("== concurrent1 done ==");
// }

// async function concurrent2() {
//   console.log("== concurrent2 starts ==");

//   // 1. Start two timers concurrently, log immediately after each one is done
//   await Promise.all([
//     (async () => console.log(await resolveAfter2Seconds()))(),
//     (async () => console.log(await resolveAfter1Second()))(),
//   ]);
//   console.log("== concurrent2 done ==");
// }

// sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"

// // wait above to finish
// setTimeout(sequentialWait, 4000); // after 2 seconds, logs "slow" and then "fast"

// // wait again
// setTimeout(concurrent1, 7000); // same as sequentialWait

// // wait again
// setTimeout(concurrent2, 10000); // after 1 second, logs "fast", then after 1 more second, "slow"
const solc = require("solc");
const { ethers, formatEther } = require("ethers");
const fs = require("fs");
const { Wallet } = require("ethers");
require("dotenv").config();

async function main() {
    // compile them in our code.
    // compile them seperately.
    //   var input = {
    //     language: "Solidity",
    //     sources: {
    //       "SimpleStorage.sol": {
    //         content: "contract C { function f() public { } }",
    //       },
    //     },
    //     settings: {
    //       outputSelection: {
    //         "*": {
    //           "*": ["*"],
    //         },
    //       },
    //     },
    //   };
    //   var output = JSON.parse(solc.compile(JSON.stringify(input)));
    //   // `output` here contains the JSON output as specified in the documentation
    //   for (var contractName in output.contracts["SimpleStorage.sol"]) {
    //     let contract = output.contracts["SimpleStorage.sol"][contractName];
    //     console.log(contractName + ": " + contract.evm.bytecode.object);
    //     console.log(contractName + ": " + JSON.stringify(contract.abi));
    //     console.log(contract);
    //   }
    //******************************** ETHERS ************************************* */

    const provider = new ethers.JsonRpcProvider(process.env.RP_UR);

    const wallet = new ethers.Wallet(process.env.PRIV_KEY, provider);
    // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf-8");
    // let wallet = ethers.Wallet.fromEncryptedJsonSync(
    //   encryptedJson,
    //   process.env.PRIVATE_KEY_PASSWORD
    // );

    // wallet = await wallet.connect(provider);

    const abi = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.abi",
        "utf-8",
    );
    const binary = fs.readFileSync(
        "SimpleStorage_sol_SimpleStorage.bin",
        "utf-8",
    );

    // const signer = provider.getSigner(); // to sign transaction for authorize it.
    // const blockNumber = await provider.getBlockNumber();
    // console.log("Getting the provider blockNumber : " + blockNumber);
    // const tx = (await signer).sendTransaction({
    //   to: "0xae1E3655E2a0AAA02F7973e2630EBA19fFB60536",
    //   value: ethers.parseUnits("1.0"),
    // });

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying......., please wait");

    const contract = await contractFactory.deploy(); //STOP here! wait for contract to deploy.
    await contract.deploymentTransaction().wait(1);
    console.log(`Contract address is : ${await contract.getAddress()}`);

    let balance = await provider.getBalance(process.env.ACC_NO);

    console.log("The balance is : ");
    console.log(formatEther(balance));

    // console.log("Here is the deployment transaction:");
    // console.log(contract);

    // console.log("Here is the transaction receipt: ");
    // console.log(transactionReceipt);

    //******************************* Send Transaction manually ***************************** */

    // console.log("Let's deploy with only transaction data!");
    // const nonce = await provider.getTransactionCount(
    //   "0x42E0328a71648576514DD1EDD11D28D131a0eE30"
    // );

    // const tx = {
    //   nonce: nonce, // nonce = number only used once.
    //   gasPrice: "20000000000",
    //   gasLimit: "1000000",
    //   to: null,
    //   value: 0,
    //   data: "0x608060405234801561001057600080fd5b50610d42806100206000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80638be275f3116100715780638be275f314610157578063af22068e14610175578063b35fbb2714610191578063c2717905146101af578063ca24d7aa146101e1578063dcfd879814610211576100a9565b80631b1647ee146100ae578063262a9dff146100e157806338cc4831146100ff57806373d4a13a1461011d57806387e31d9f1461013b575b600080fd5b6100c860048036038101906100c391906107ed565b61022f565b6040516100d8949392919061099b565b60405180910390f35b6100e96102f8565b6040516100f691906109ee565b60405180910390f35b6101076102fe565b6040516101149190610a4a565b60405180910390f35b610125610328565b6040516101329190610a7e565b60405180910390f35b61015560048036038101906101509190610af1565b61032e565b005b61015f6103ed565b60405161016c91906109ee565b60405180910390f35b61018f600480360381019061018a9190610b60565b6103fa565b005b61019961041c565b6040516101a69190610a4a565b60405180910390f35b6101c960048036038101906101c49190610bbc565b610442565b6040516101d893929190610bf8565b60405180910390f35b6101fb60048036038101906101f691906107ed565b610511565b60405161020891906109ee565b60405180910390f35b61021961053f565b6040516102269190610c36565b60405180910390f35b60006102396105cd565b6060600060058560405161024d9190610c94565b90815260200160405180910390205460405180606001604052806040518060400160405280600581526020017f53756d69740000000000000000000000000000000000000000000000000000008152508152602001601e81526020016001151581525060016040518060400160405280600781526020017f6e6f2064617461000000000000000000000000000000000000000000000000008152509093509350935093509193509193565b60025481565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60005481565b600060405180606001604052808581526020018481526020018315158152509050600481908060018154018082558091505060019003906000526020600020906003020160009091909190915060008201518160000190805190602001906103979291906105f0565b506020820151816001015560408201518160020160006101000a81548160ff0219169083151502179055505050826005856040516103d59190610c94565b90815260200160405180910390208190555050505050565b6000600480549050905090565b81600190805190602001906104109291906105f0565b50806002819055505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6004818154811061045257600080fd5b906000526020600020906003020160009150905080600001805461047590610cda565b80601f01602080910402602001604051908101604052809291908181526020018280546104a190610cda565b80156104ee5780601f106104c3576101008083540402835291602001916104ee565b820191906000526020600020905b8154815290600101906020018083116104d157829003601f168201915b5050505050908060010154908060020160009054906101000a900460ff16905083565b6005818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b6001805461054c90610cda565b80601f016020809104026020016040519081016040528092919081815260200182805461057890610cda565b80156105c55780601f1061059a576101008083540402835291602001916105c5565b820191906000526020600020905b8154815290600101906020018083116105a857829003601f168201915b505050505081565b604051806060016040528060608152602001600081526020016000151581525090565b8280546105fc90610cda565b90600052602060002090601f01602090048101928261061e5760008555610665565b82601f1061063757805160ff1916838001178555610665565b82800160010185558215610665579182015b82811115610664578251825591602001919060010190610649565b5b5090506106729190610676565b5090565b5b8082111561068f576000816000905550600101610677565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6106fa826106b1565b810181811067ffffffffffffffff82111715610719576107186106c2565b5b80604052505050565b600061072c610693565b905061073882826106f1565b919050565b600067ffffffffffffffff821115610758576107576106c2565b5b610761826106b1565b9050602081019050919050565b82818337600083830152505050565b600061079061078b8461073d565b610722565b9050828152602081018484840111156107ac576107ab6106ac565b5b6107b784828561076e565b509392505050565b600082601f8301126107d4576107d36106a7565b5b81356107e484826020860161077d565b91505092915050565b6000602082840312156108035761080261069d565b5b600082013567ffffffffffffffff811115610821576108206106a2565b5b61082d848285016107bf565b91505092915050565b6000819050919050565b61084981610836565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561088957808201518184015260208101905061086e565b83811115610898576000848401525b50505050565b60006108a98261084f565b6108b3818561085a565b93506108c381856020860161086b565b6108cc816106b1565b840191505092915050565b6108e081610836565b82525050565b60008115159050919050565b6108fb816108e6565b82525050565b6000606083016000830151848203600086015261091e828261089e565b915050602083015161093360208601826108d7565b50604083015161094660408601826108f2565b508091505092915050565b600082825260208201905092915050565b600061096d8261084f565b6109778185610951565b935061098781856020860161086b565b610990816106b1565b840191505092915050565b60006080820190506109b06000830187610840565b81810360208301526109c28186610901565b905081810360408301526109d68185610962565b90506109e56060830184610840565b95945050505050565b6000602082019050610a036000830184610840565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a3482610a09565b9050919050565b610a4481610a29565b82525050565b6000602082019050610a5f6000830184610a3b565b92915050565b6000819050919050565b610a7881610a65565b82525050565b6000602082019050610a936000830184610a6f565b92915050565b610aa281610836565b8114610aad57600080fd5b50565b600081359050610abf81610a99565b92915050565b610ace816108e6565b8114610ad957600080fd5b50565b600081359050610aeb81610ac5565b92915050565b600080600060608486031215610b0a57610b0961069d565b5b600084013567ffffffffffffffff811115610b2857610b276106a2565b5b610b34868287016107bf565b9350506020610b4586828701610ab0565b9250506040610b5686828701610adc565b9150509250925092565b60008060408385031215610b7757610b7661069d565b5b600083013567ffffffffffffffff811115610b9557610b946106a2565b5b610ba1858286016107bf565b9250506020610bb285828601610ab0565b9150509250929050565b600060208284031215610bd257610bd161069d565b5b6000610be084828501610ab0565b91505092915050565b610bf2816108e6565b82525050565b60006060820190508181036000830152610c128186610962565b9050610c216020830185610840565b610c2e6040830184610be9565b949350505050565b60006020820190508181036000830152610c508184610962565b905092915050565b600081905092915050565b6000610c6e8261084f565b610c788185610c58565b9350610c8881856020860161086b565b80840191505092915050565b6000610ca08284610c63565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610cf257607f821691505b60208210811415610d0657610d05610cab565b5b5091905056fea26469706673582212205aff5ebc4f6d3091571f78395a3373324393a841a11cdb7b4cff502aff5eb84664736f6c634300080a0033",
    //   chainId: 1337,
    // };

    // const sentTxResponse = await wallet.sendTransaction(tx);
    // await sentTxResponse.wait(1);
    // console.log(sentTxResponse);

    // await contract.addData("Ritik", 22, false);
    const currentLength = await contract.getPeopleInfoLength();
    const displayAllDataVariable = await contract.displayAllData("Pradeep");
    // const arrayResult = await contract.peopleInfo[0];
    console.log(`The length of the array of info is : ${currentLength}`);
    console.log(displayAllDataVariable);

    const transactionResponse = await contract.addData("Pradeep", "21", false);
    const transactionReceipt = await transactionResponse.wait(1);

    const newLengthofArray = await contract.getPeopleInfoLength();
    console.log(`The length of the array of info is : ${newLengthofArray}`);

    // console.log(arrayResult);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
