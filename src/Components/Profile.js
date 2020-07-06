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
        // this.characters = this.characters.bind(this);
    }

    componentDidMount(){
        let {id} = this.props.reducer.user
        Axios.get(`/api/characters?user=${id}`)
            .then(res => this.setState({characters: res.data}))
            .catch(() => alert('Failed to load characters.'))
    }

    handleClick(){}
    handleChange(){}

    render(){
        return(
            <main className='Profile'>
                <h1>{this.props.reducer.user.username}'s Characters</h1>
                <section className='userCharacters'>
                    {this.state.characters[0] ? (
                        this.state.characters.map((member, i) =>(
                            this.state.edit === false ? (
                                <div className='userCharacters'>
                                    <FullView member={member} i={i} component={'Profile'}/>
                                </div>
                                    ) : (
                                    <form className='editCharacter'>
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
                                        <button onClick={()=> this.setState({edit: false})}>Submit</button>
                                    </form>
                                )
                                
                        ))
                    ) : (
                        <h1>Contact AutoDave to add your character</h1>
                    )}
                </section>
                {/* <section className='addCharacter'>
                    <form>
                        <select>
                            <option>TOA</option>
                            <option>Winds of Change</option>
                        </select>
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
                    </form>
                </section> */}
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