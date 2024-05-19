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
const ethers = require("ethers");
const fs = require("fs");

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

  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

  const wallet = new ethers.Wallet(
    "0x69684aa83d092e3551a4ec57c063ba5559f1e4b30622ed288f1fb56960c0d2cf",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying......., please wait");

  const contract = await contractFactory.deploy(); //STOP here! wait for contract to deploy.

  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
