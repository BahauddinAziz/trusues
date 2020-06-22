import React, { Component } from 'react';
import CryptoJS from 'crypto-js'

export class AddAccount extends Component {

    state = {
        accountName : "",
        Username : "",
        Password : ""
    }

    getAccount = (e) =>{
       let name = e.target.name;
       let value = e.target.value;

       this.setState({
           [name] : value
       })
    }

    addAccount = async () =>{

        await this.setState({
            accountName : CryptoJS.SHA256(this.state.accountName).toString(CryptoJS.enc.Base64),
            Username : CryptoJS.DES.encrypt(this.state.Username, this.props.State.masterKey).toString(CryptoJS.enc.base64),
            Password : CryptoJS.DES.encrypt(this.state.Password, this.props.State.masterKey).toString(CryptoJS.enc.base64)
        })

        await this.props.State.trusuesContract.methods.addAccount(this.state.accountName, this.state.Username, this.state.Password).send({ from: this.props.State.address });
        alert("Account Added");
        this.props.history.push('/');
    }

    componentDidMount(){
        if(!this.props.State.isLoggedIn){
            this.props.history.push('/masterKey')
        }
    }

    render() {
        return (
            <div id="centered-div">
                <p id="def-heading">ENTER ACCOUNT DETAILS</p>
                <div id="def-inp">
                    <input autoComplete="off" type="text" name="accountName" id="" placeholder="Enter Account Name" onChange={this.getAccount} />
                </div>
                <div id="def-inp">
                    <input autoComplete="off" type="text" name="Username" id="" placeholder="Enter Username" onChange={this.getAccount} />
                </div>
                <div id="def-inp">
                    <input autoComplete="off" type="password" name="Password" id="" placeholder="Enter Password" onChange={this.getAccount} />
                </div>
                <button id="def-btn" onClick={this.addAccount} >Add Account</button>
            </div>
        )
    }
}