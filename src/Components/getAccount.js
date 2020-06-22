import React, { Component } from 'react';
import Profile from '../Assets/Profile.png';
import CryptoJS from 'crypto-js'

export default  class GetAccount extends Component {    

    state = {
        query : "",
        result : {}
    }

    query = (e) => {
        this.setState({
            query : e.target.value
        })
    }

    result = async () =>{

        let que = CryptoJS.SHA256(this.state.query).toString(CryptoJS.enc.Base64);
        await this.setState({
            result : await this.props.State.trusuesContract.methods.getAccounts(this.props.State.address, que).call()
        })
        this.props.SetResult({...this.state.result, accountName : this.state.query});
        this.props.history.push('/result')
    }

    componentDidMount(){
        if(!this.props.State.isLoggedIn){
            this.props.history.push('/masterKey')
        }
    }

    render() {
        return (
            <div id="centered-div">
                <p id="def-heading">ENTER ACCOUNT NAME</p>
                <div id="def-inp">
                    <input autoComplete="off" type="text" name="masterkey" id="" placeholder="Enter Account Name" onChange={this.query} />
                    <img src={Profile} alt="img" id="profile" />
                </div>
                <button id="def-btn" onClick={this.result}>Get Account</button>
            </div>
        )
    }
}