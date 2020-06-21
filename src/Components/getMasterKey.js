import React, { Component } from 'react';
import Profile from '../Assets/Profile.png'
import { withRouter } from 'react-router-dom';

class GetMasterKey extends Component {

    state = {
        key: ""
    }

    getKey = (e) =>{
        this.setState({
            key : e.target.value
        })
    }

    setKey = () =>{
        this.props.Setter(this.state.key)
        this.props.history.push('/')
    }

    render() {
        return (
            <div id="centered-div">
                <p id="def-heading">ENTER YOUR MASTER KEY</p>
                <div id="def-inp">
                    <input type="text" name="masterkey" id="" placeholder="Enter Master Key" onChange={this.getKey} />
                    <img src={Profile} alt="img" id="profile"/>
                </div>
                <button id="def-btn" onClick={this.setKey} >Enter</button>
            </div>
        )
    }
}

export default withRouter(GetMasterKey)