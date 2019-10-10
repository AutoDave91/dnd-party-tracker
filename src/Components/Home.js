import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';
// import Axios from 'axios';

import '../style/home.css';

class Home extends Component {
    constructor(){
        super()
        this.state = {
            option: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({option: e.target.value})
    }

    render(){
        let {option} = this.state
        return(
            <main className='Home'>
                <h1>Welcome to AutoDave's Dungeons and Dragons Aid!</h1>
                <h2>Please select your campaign below:</h2>
                <select onChange={this.handleChange}>
                    <option value=''>Select Campaign</option>
                    <option value='sw5e1'>sw5e Campaign 1</option>
                    <option value='LnD'>Luncheon in a Dungeon</option>
                    <option value='Slime'>Slimeshot</option>
                </select>
                {option ? (
                    <Link to={`/campaign/${option}`}><button>Visit Campaign</button></Link>
                ) : (
                    null
                )}
            </main>
        )
    }
}

export default Home