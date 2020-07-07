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
            campaign_id: 0,
            character_id: 0,
            token: '',
            name: '',
            class: '',
            party_role: '',
            lvl: 0,
            max_hp: 0,
            ac: 0,
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
        this.engageToggle = this.engageToggle.bind(this)
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
        this.setState({edit: false})
    }
    handleChange(){
        // handle inputs
    }
    engageToggle(member){
        // console.log(member)
        let character_class = member.class
        let {character_id, token, character_name, party_role, lvl, max_hp, ac, current_hp, temp_hp, strength, dex, con, intel, wis, cha} = member
        this.setState({edit: true, character_id, token, name: character_name, class: character_class, party_role, lvl, max_hp, ac, current_hp, temp_hp, strength, dex, con, intel, wis, cha})
        // console.log(this.state)
    }

    render(){
        let character_class = this.state.class
        let {campaign_id, character_id, token, name, party_role, lvl, max_hp, ac, current_hp, temp_hp, strength, dex, con, intel, wis, cha, health, active} = this.state
        return(
            <main className='Profile'>
                <h1>{this.props.reducer.user.username}'s Characters</h1>
                <section className='userCharacters'>
                    {this.state.characters[0] ? (
                        this.state.characters.map((member, i) =>(
                            this.state.edit === false ? (
                                <div className='userCharacters'>
                                    <FullView member={member} i={i} component={'Profile'} editToggle={()=>this.engageToggle(member)}/>
                                </div>
                            ) : (
                                <div className='member' id='editCharacter'>
                                    <h3>Token Image</h3>
                                    <h3>Name: <input placeholder={name} /></h3>
                                    <h3>Class: <input placeholder={character_class} /></h3>
                                    <h3>Party Role: <input placeholder={party_role} /></h3>
                                    <h3>Level: <input placeholder={lvl} /></h3>
                                    <h3>Max HP: <input placeholder={max_hp} /></h3>
                                    <h3>AC: <input placeholder={ac} /></h3>
                                    <h3>Current HP: <input placeholder={current_hp} /></h3>
                                    <h3>Temp HP: <input placeholder={temp_hp} /></h3>
                                    <h3>STR: <input placeholder={strength} /></h3>
                                    <h3>DEX: <input placeholder={dex} /></h3>
                                    <h3>CON: <input placeholder={con} /></h3>
                                    <h3>INT: <input placeholder={intel} /></h3>
                                    <h3>WIS: <input placeholder={wis} /></h3>
                                    <h3>CHA: <input placeholder={cha} /></h3>
                                    <h3>Status for next session: <select>
                                        <option>Here</option>
                                        <option>Away</option>
                                    </select></h3>
                                    <button onClick={this.handleClick}>Submit</button>
                                </div>
                            )
                                
                        ))
                    ) : (
                        <h1>Contact AutoDave to add your character</h1>
                    )}
                </section>
                <section className='member' id='createCharacter'>
                    <select>
                        <option>TOA</option>
                        <option>Winds of Change</option>
                    </select>
                    <h3>token image uploads coming soon</h3>
                    <input placeholder='Name' />
                    <input placeholder='Class' />
                    <input placeholder='Party Role' />
                    <input placeholder='Level' />
                    <input placeholder='Max HP' />
                    <input placeholder='AC' />
                    <input placeholder='Current HP' />
                    <input placeholder='Temp HP' />
                    <input placeholder='STR' />
                    <input placeholder='DEX' />
                    <input placeholder='CON' />
                    <input placeholder='INT' />
                    <input placeholder='WIS' />
                    <input placeholder='CHA' />
                    <select>
                        <option>Here</option>
                        <option>Away</option>
                    </select>
                    <button onClick={this.handleClick}>Create Character</button>
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