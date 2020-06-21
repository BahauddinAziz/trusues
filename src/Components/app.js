import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './home';
import { AddAccount } from './addAccount';
import GetAccount from './getAccount';
import GetMasterKey from './getMasterKey';
import Result from './result';
import Web3 from 'web3';




export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            masterKey : "",
            isLoggedIn : false,
            result : {
                accountName : "",
                Username : "",
                Password : ""
            }
        }
    }

    setter = (key) => {
        this.setState({
            masterKey : key,
            isLoggedIn : true
        })
    }

    setResult = (res) => {
        this.setState({
            result : res
        })
    }

    async componentDidMount() {

        try{
            await window.ethereum.enable();
        }catch(e){
            alert(e.message);
        }
        await this.setState({
            web3: new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:7545'),
            address: window.ethereum.selectedAddress,
            abi: [
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
            ],
        })

        await this.setState({
            trusuesContract: new this.state.web3.eth.Contract(this.state.abi, "0xf01e8a68382fe95e439b59f06ff6e87db53234f7")
        })        
    }

    render() {
        return (
            <div id="root">
                <BrowserRouter>

                    <Route exact path='/' render={ (props) => <Home {...props} State = {this.state}/>} />
                    <Route exact path='/masterKey' render={ (props) => <GetMasterKey {...props} State = {this.state} Setter = {this.setter}/>} />
                    <Route exact path='/addAccount' render={ (props) => <AddAccount {...props} State = {this.state}/>} />
                    <Route exact path='/getAccount' render={ (props) => <GetAccount {...props} State = {this.state} SetResult = {this.setResult} />} />
                    <Route exact path='/result' render={ (props) => <Result {...props} State = {this.state}/>} />

                </BrowserRouter>
            </div>
        )
    }
}
