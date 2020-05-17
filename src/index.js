

//enabling ethereum
window.ethereum.enable()

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



// functions-DOM

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

}


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


