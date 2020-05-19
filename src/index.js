<<<<<<< HEAD
=======
const Web3 = require('web3');
const CryptoJS = require('crypto-js');
>>>>>>> 6cb4b584f54780e281fcd0c9879f4a99362d28d9


//enabling ethereum
window.ethereum.enable()

<<<<<<< HEAD
// varibles - contract
var web3 = new Web3( Web3.givenProvider || 'HTTP://127.0.0.1:7545');
var address = web3.currentProvider.selectedAddress;
var abi =   [
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
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "mySearch",
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
          "name": "_mk",
          "type": "string"
        }
      ],
      "name": "setMasterKey",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
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
var trusuesContract = new web3.eth.Contract(abi,"0x411fD19601Cb5b98B9321Ccf436FD63926A528E3");
console.log(address)


// varibles-DOM
var privateKey;
var masterKey;
var account = {
    "accountName" : "",
    "Username" : "",
    "Password" : ""
}
var search;
=======
// varibles-DOM
var masterKey;
var passphrase;
var account = {
  "accountName" : "test name",
  "Username" : "bahauddin",
  "Password" : "pass"
}
var search;
var website;
var credentials;
>>>>>>> 6cb4b584f54780e281fcd0c9879f4a99362d28d9



// functions-DOM

<<<<<<< HEAD
privateKey = 'ECAC051BFCE03D4C19D25355200738BE3B4F905C302B5351BEE3763CF36F30DA'

function getMasterKey(event){
    masterKey = event.target.value;
}

async function setMasterKey(){
  console.log(masterKey)
   trusuesContract.methods.setMasterKey(masterKey).send({from:address}).then(() => { console.log("masterKey Added"); });
}

function getAccount(event){
    let name = event.target.name;
    let val = event.target.value;
    
    account[name] = val; 
=======

window.getMasterKey = function(event){
  masterKey = event.target.value;
}

window.setMasterKey = function(){
  passphrase = masterKey;
  document.getElementById('masterKey').value = "";
}

window.getAccount = function(event){
  let name = event.target.name;
  let val = event.target.value;
    
  account[name] = val; 
>>>>>>> 6cb4b584f54780e281fcd0c9879f4a99362d28d9

}


<<<<<<< HEAD
async function addAccount(){
    console.log(account)
    await trusuesContract.methods.addAccount(account.accountName,account.Username,account.Password).send({from : address});
    console.log("done")
}

function setQuery(event){
    search = event.target.value;
}

function getResult(){
    trusuesContract.methods.mySearch(address,masterKey,search).call().then(res => {
      let user = res.Username;
      let pass = res.Password;
      document.getElementById('accounts').innerHTML = user + '<br>' + pass;
    })
}


=======
window.addAccount = async function(){
  website = CryptoJS.SHA256(account.accountName).toString(CryptoJS.enc.Hex);
  for(data in account){
    account[data] = CryptoJS.DES.encrypt(account[data],passphrase).toString(CryptoJS.enc.base64);
  }
  
  await trusuesContract.methods.addAccount(website,account.Username,account.Password).send({from : address});
}

window.setQuery = function(event){
  search = event.target.value;
}

window.getResult = async function(){
  search = CryptoJS.SHA256(search).toString(CryptoJS.enc.Hex)
  credentials = await trusuesContract.methods.getAccounts(address,search).call()
  for(data in credentials){
    credentials[data] = CryptoJS.DES.decrypt(credentials[data],passphrase).toString(CryptoJS.enc.Utf8);
  }
  document.getElementById('result').innerHTML = 'Username : ' + credentials.Username + '<br>' + 'Password : ' + credentials.Password; 
}

// varibles - contract
var web3 = new Web3( Web3.givenProvider || 'HTTP://127.0.0.1:7545');
var address = web3.currentProvider.selectedAddress;
var abi = [
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
var trusuesContract = new web3.eth.Contract(abi,"0xd59bb48cb49c4F5214cA5F8D9350278C18984978");
>>>>>>> 6cb4b584f54780e281fcd0c9879f4a99362d28d9
