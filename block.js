var web3;
var address = "0x35007e3431a67e4508439B845a32E4bfE37a3633";

async function Connect() {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(window.ethereum);

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      resolve(web3);
    } catch (error) {
      reject(error);
    }
  });
}

if (typeof window.ethereum !== "undefine") {
  web3 = new Web3(window.ethereum);
} else {
  web3 = new Web3(new Web3.Provider.HttpProvider("HTTP://127.0.0.1:7545"));
}

var abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

var contract = new web3.eth.Contract(abi, address);

function Deposit() {
  var amount = document.getElementById("amount").value;

  web3.eth
    .getAccounts()
    .then(function (account) {
      return contract.methods.deposit(amount).send({ from: account[0] });
    })
    .then(function (tmp) {
      $("#amount").val("");
      DisplayBalance();
    })
    .catch(function (tmp) {
      alert(tmp);
    });
}

function Withdraw() {
  var amount = document.getElementById("amount").value;

  web3.eth
    .getAccounts()
    .then(function (account) {
      return contract.methods.withdraw(amount).send({ from: account[0] });
    })
    .then(function (tmp) {
      $("#amount").val("");
      DisplayBalance();
    })
    .catch(function (tmp) {
      alert(tmp);
    });
}

function DisplayBalance() {
  contract.methods
    .getBalance()
    .call()
    .then(function (balance) {
      $("#balance").html(balance);
    });
}
