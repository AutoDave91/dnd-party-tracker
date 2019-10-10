import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
// import Axios from 'axios';

import FullView from './FullView';

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            characters: []
        }
        this.characters = this.characters.bind(this);
    }

    componentDidMount(){
        // Axios request to pull characters in this.props.match.params.name, then setState party to the results
        this.characters()
    }
    // Axios request to send HP change to db
        characters(){
            let characters = []
            for(let i=0; i < this.props.reducer.data.length; i++){
                if(this.props.reducer.data[i].player === this.props.reducer.user.username){
                    characters.push(this.props.reducer.data[i])
                }
            }
            this.setState({characters: characters})
        }

    render(){
        return(
            <main className='Profile'>
                <h1>{this.props.reducer.user.username}</h1>
                {this.state.characters[0] ? (
                    this.state.characters.map((member, i) =>(
                        <FullView member={member} i={i} component={'Profile'}/>
                    ))
                ) : (
                    <h1>Contact AutoDave to add your character</h1>
                )}
            </main>
        )
    }
}

const mapStateToProps = state => {
    return {
        reducer: state
    }
}
export default connect(mapStateToProps)(Profile)