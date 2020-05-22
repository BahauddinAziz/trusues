const Web3 = require('web3');
const CryptoJS = require('crypto-js');


//enabling ethereum and variables
var web3;
var address;
var abi;
var trusuesContract;

window.enableEthereum = async function () {
  await window.ethereum.enable();
}

function setEthereum() {
  web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:7545');
  address = ethereum.selectedAddress;
  abi = [
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "getAccounts",
      "outputs": [
        {
          "internalType": "string",
          "name": "Username",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "Password",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_username",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_password",
          "type": "string"
        }
      ],
      "name": "addAccount",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  trusuesContract = new web3.eth.Contract(abi, "0xf01e8a68382fe95e439b59f06ff6e87db53234f7");
}



// varibles-DOM
var masterKey;
var passphrase;
var account = {
  "accountName": "test name",
  "Username": "bahauddin",
  "Password": "pass"
}
var search;
var website;
var credentials;


// functions-DOM
window.getMasterKey = function (event) {
  setEthereum();
  masterKey = event.target.value;
}

window.setMasterKey = function () {
  passphrase = masterKey;
  document.getElementById('masterKey').value = "";
}

window.getAccount = function (event) {
  let name = event.target.name;
  let val = event.target.value;

  account[name] = val;

}

window.addAccount = async function () {
  website = CryptoJS.SHA256(account.accountName).toString(CryptoJS.enc.Hex);
  for (data in account) {
    account[data] = CryptoJS.DES.encrypt(account[data], passphrase).toString(CryptoJS.enc.base64);
  }

  await trusuesContract.methods.addAccount(website, account.Username, account.Password).send({ from: address });
}

window.setQuery = function (event) {
  search = event.target.value;
}

window.getResult = async function () {
  search = CryptoJS.SHA256(search).toString(CryptoJS.enc.Hex)
  credentials = await trusuesContract.methods.getAccounts(address, search).call()
  for (data in credentials) {
    credentials[data] = CryptoJS.DES.decrypt(credentials[data], passphrase).toString(CryptoJS.enc.Utf8);
  }
  document.getElementById('result').innerHTML = 'Username : ' + credentials.Username + '<br>' + 'Password : ' + credentials.Password;
}

