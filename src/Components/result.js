import React, { Component } from 'react';
import CryptoJS from 'crypto-js'

export default  class Result extends Component {

    state = {
        accountName : "",
        Username : "",
        Password : ""
    }

    async componentDidMount(){
        if(!this.props.State.isLoggedIn){
            this.props.history.push('/masterKey')
        }
        await this.setState({
            Username : CryptoJS.DES.decrypt(this.props.State.result.Username, this.props.State.masterKey).toString(CryptoJS.enc.Utf8),
            Password : CryptoJS.DES.decrypt(this.props.State.result.Password, this.props.State.masterKey).toString(CryptoJS.enc.Utf8),
            accountName : this.props.State.result.accountName
        })

        console.log(this.props)
    }

    render() {
        return (
            <div id="centered-div">
                <p id="def-heading">Your Account</p>
                <p>{this.state.accountName}</p>
                <div id="result">
                     Username  <br/>
                        {this.state.Username} <br/>
                    <br/><br/>
                      Password  <br/>
                      {this.state.Password}
                </div>
            </div>
        )
    }
}