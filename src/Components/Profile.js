import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Axios from 'axios';

class Profile extends Component {
    constructor(){
        super()
        this.state = {}
    }

    render(){
        return(
            <main className='Profile'>
                <h1>Profile</h1>
            </main>
        )
    }
}

export default Profile