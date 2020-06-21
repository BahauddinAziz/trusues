import React, { Component } from 'react';

export default class Home extends Component {

    addAccountClick = (e) => {
        if(!this.props.State.isLoggedIn)
        this.props.history.push('/masterKey');
        else{
        this.props.history.push('/addAccount');
        }
    }

    getAccountClick = (e) => {
        if(!this.props.State.isLoggedIn)
        this.props.history.push('/masterKey');
        else
        this.props.history.push('/getAccount');
    }
    render() {
        return (
            <div id="root">
                {/* <button onClick={} ></button> */}
                <img src="trusues.png" alt="logo" id="logo" />
                <p id="tagline">" Where trust is not an issue "</p>
                <div id="home-container">
                    <div id="home-btn">
                        <button id="def-btn" onClick={this.addAccountClick} >
                            Add Account
                        </button>
                        <p id="sm-txt"> To add an account to your vault. </p>
                    </div>
                    <div id="VR"></div>
                    <div id="home-btn">
                        <button id="def-btn" onClick={this.getAccountClick} >
                            Get Account
                        </button>
                        <p id="sm-txt"> To get an account from your vault. </p>
                    </div>
                </div>
            </div>
        )
    }
}