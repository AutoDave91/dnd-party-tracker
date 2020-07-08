import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Axios from 'axios';

import '../style/profile.css'
import FullView from './FullView';

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            characters: [],
            edit: false,
            new: false,
            campaign_id: 0,
            character_id: 0,
            token: '',
            character_name: '',
            character_class: '',
            party_role: '',
            lvl: 0,
            max_hp: 0,
            character_ac: 0,
            current_hp: 0,
            temp_hp: 0,
            strength: 0,
            dex: 0,
            con: 0,
            intel: 0,
            wis: 0,
            cha: 0,
            health: 'ok',
            active: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.editToggle = this.editToggle.bind(this);
        this.addToggle = this.addToggle.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        let {id} = this.props.reducer.user
        Axios.get(`/api/characters?user=${id}`)
            .then(res => this.setState({characters: res.data}))
            .catch(() => alert('Failed to load characters.'))
    }

    handleClick(){
        // Send Axios request with state to either add or edit a character. Use character_id to know which is required (edit or create)
        // use reducer's state from session to send in the player_id to link characters to their user.
        this.setState({edit: false, new: false})
    }
    handleChange(e){
        // handle inputs
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state)
    }
    editToggle(member){
        // console.log(member)
        let character_class = member.class
        let {character_id, token, character_name, party_role, lvl, max_hp, ac, current_hp, temp_hp, strength, dex, con, intel, wis, cha} = member
        this.setState({edit: true, character_id, token, character_name, character_class, party_role, lvl, max_hp, character_ac: ac, current_hp, temp_hp, strength, dex, con, intel, wis, cha})
        // console.log(this.state)
    }
    addToggle(){
        // console.log(member)
        this.setState({new: true})
        // console.log(this.state)
    }

    render(){
        // let {campaign_id, character_id, token, character_name, party_role, lvl, character_class, max_hp, character_ac, current_hp, temp_hp, strength, dex, con, intel, wis, cha, health, active} = this.state
        return(
            <main className='Profile'>
                <h1>{this.props.reducer.user.username}'s Characters</h1>
                {this.state.new === true ?
                    (
                        <section className='member' id='createCharacter'>
                            <select onChange={this.handleChange} className='campaign_id'>
                                <option value='1'>TOA</option>
                                <option value='2'>Winds of Change</option>
                            </select>
                            <h3>token image uploads coming soon</h3>
                            <input onChange={this.handleChange} className='character_name' placeholder='Name' />
                            <input onChange={this.handleChange} className='character_class' placeholder='Class' />
                            <input onChange={this.handleChange} className='party_role' placeholder='Party Role' />
                            <input onChange={this.handleChange} className='lvl' placeholder='Level' />
                            <input onChange={this.handleChange} className='max_hp' placeholder='Max HP' />
                            <input onChange={this.handleChange} className='character_ac' placeholder='AC' />
                            <input onChange={this.handleChange} className='current_hp' placeholder='Current HP' />
                            <input onChange={this.handleChange} className='temp_hp' placeholder='Temp HP' />
                            <input onChange={this.handleChange} className='strength' placeholder='STR' />
                            <input onChange={this.handleChange} className='dex' placeholder='DEX' />
                            <input onChange={this.handleChange} className='con' placeholder='CON' />
                            <input onChange={this.handleChange} className='intel' placeholder='INT' />
                            <input onChange={this.handleChange} className='wis' placeholder='WIS' />
                            <input onChange={this.handleChange} className='cha' placeholder='CHA' />
                            <select onChange={this.handleChange} className='active'>
                                <option value='true'>Here</option>
                                <option value='false'>Away</option>
                            </select>
                            <button onClick={this.handleClick} className='submit'>Create Character</button>
                        </section>
                    ) : <button className='new' onClick={()=>this.addToggle()}>Add New Character</button>
                }
                <section className='userCharacters'>
                    {this.state.characters[0] ? (
                        this.state.characters.map((member, i) =>(
                            // this.state.edit === false ? (
                                <div className='userCharacters'>
                                    <FullView member={member} i={i} component={'Profile'} editToggle={()=>this.editToggle(member)} edit={this.state.edit} state={this.state} handleChange={this.handleChange} handleClick={this.handleClick}/>
                                </div>
                        ))
                    ) : (
                        <h1>Contact AutoDave to add your character</h1>
                    )}
                </section>
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