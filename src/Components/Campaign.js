import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Axios from 'axios';

import '../style/campaign.css';

class Campaign extends Component {
    constructor(){
        super()
        this.state = {
            // data will be moved to database at some point
            data: [
                {campaign: 'sw5e1', img: 'https://cdn.discordapp.com/attachments/316704555154800642/630934544375349248/Grayjedithetermgrayjediorgrayhadtwo_324b74_5788445.jpg', player: 'Wonsnot', name: 'Geoff', class: 'Consular', lvl: 4, max_hp: 11, ac: 13, current_hp: 11, temp_hp: 3, str: 12, dex: 16, con: 10, int: 11, wis: 10, cha: 16}, 
                {campaign: 'sw5e1', img: 'https://i.pinimg.com/originals/11/56/d3/1156d37d76f884da477279fed684080b.jpg', player: 'AutoDave', name: 'O-yasha', class: 'Guardian', lvl: 4, max_hp: 20, ac: 15, current_hp: 18, temp_hp: 0, str: 15, dex: 10, con: 14, int: 11, wis: 17, cha: 10}, 
                {campaign: 'sw5e1', img: '', player: 'NantanLupan', name: 'Gadget', class: 'Engineer', lvl: 4, max_hp: 35, ac: 0, current_hp: 0, temp_hp: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0}, 
                {campaign: 'sw5e1', img: '', player: 'StormReavan', name: 'Vulcan', class: 'Operative', lvl: 4, max_hp: 0, ac: 0, current_hp: 0, temp_hp: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0},
                {campaign: 'LnD', img: '', player: 'test', name: 'test', class: 'test', lvl: 0, max_hp: 0, ac: 0, current_hp: 0, temp_hp: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0}
            ],
            party: [],
            hp_change: 0,
            target: 'Geoff'
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.party = this.party.bind(this)
    }

    componentDidMount(){
        // Axios request to pull characters in this.props.match.params.name, then setState party to the results
        this.party()
    }
    // Axios request to send HP change to db
        party(){
            let party = []
            for(let i=0; i < this.state.data.length; i++){
                if(this.state.data[i].campaign === this.props.match.params.name){
                    party.push(this.state.data[i])
                }
            }
            this.setState({...this.state, party: party})
        }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    handleClick(e){
        let {party, hp_change, target} = this.state;
        let partyCopy = [...party]
        for(let i=0; i < partyCopy.length; i++){
            let {name, temp_hp} =partyCopy[i]
            if(e.target.name === 'lvl_change'){
                partyCopy[i].lvl += 1;
            } else {
                if(name === target){
                    if(e.target.name === 'heal'){
                        partyCopy[i].current_hp += +hp_change;
                    } else if(e.target.name === 'damage') {
                        if(temp_hp >= +hp_change){
                            partyCopy[i].temp_hp -= +hp_change;
                        } else {
                            let rollOver = +hp_change - temp_hp
                            partyCopy[i].temp_hp = 0;
                            partyCopy[i].current_hp -= +rollOver;
                        }
                    } else if(e.target.name === 'temp') {
                        partyCopy[i].temp_hp += +hp_change
                    }
                }
            }
        }
        this.setState({party: partyCopy, hp_change: 0})
    }

    render(){
        return(
            <main className='Campaign'>
                <h1>{this.props.match.params.name} Adventuring Party</h1>
                <div>
                    <Link to='/'><button>back to home</button></Link>
                    <button name='lvl_change' onClick={this.handleClick}>Level up!</button>
                </div>
                {/* input to receive number with 2x submit buttons (heal/harm), select to choose party member */}
                <section className='inputs'>
                    <input name='hp_change' type='number' value={this.state.hp_change} onChange={this.handleChange}/>
                    <div>
                        <button className='damage' name='damage' onClick={this.handleClick}>damage</button>
                        <button name='temp' onClick={this.handleClick}>Temp</button>
                        <button className='heal' name='heal' onClick={this.handleClick}>healing</button>
                    </div>
                        <select name='target' onChange={this.handleChange}>
                            {this.state.party.map((member, i) => (
                                <option value={member.name}>{member.name}</option>
                            ))}
                        </select>
                </section>
                <section className='party'>
                    {this.state.party[0] ? (
                        this.state.party.map((member, i) => (
                            <section className='member'>
                                <img className='party-pics' src={member.img} alt={member.name} />
                                <section className='character-info'>
                                    <div className='name-class-player'>
                                        <div className='slant-top'>
                                            <h1 className='name'>{member.name}</h1>
                                        </div>
                                        <div className='slant-bottom'>
                                            <h2 className='class'>{member.class} ({member.lvl})</h2>
                                            <h2 className='player'>controlled by: {member.player}</h2>
                                        </div>
                                    </div>
                                    <ul className='ability-scores'>
                                        <section className='ability-score'>
                                            <li>STR</li>
                                            <li className='ability-points'>{member.str}</li>
                                        </section>
                                        <section className='ability-score'>
                                            <li>DEX</li>
                                            <li className='ability-points'>{member.dex}</li>
                                        </section>
                                        <section className='ability-score'>
                                            <li>CON</li>
                                            <li className='ability-points'>{member.con}</li>
                                        </section>
                                        <section className='ability-score'>
                                            <li>INT</li>
                                            <li className='ability-points'>{member.int}</li>
                                        </section>
                                        <section className='ability-score'>
                                            <li>WIS</li>
                                            <li className='ability-points'>{member.wis}</li>
                                        </section>
                                        <section className='ability-score'>
                                            <li>CHA</li>
                                            <li className='ability-points'>{member.cha}</li>
                                        </section>
                                    </ul>
                                    <section className='ac-hp-1'>
                                        <h2 className='ac'>{member.ac}</h2>
                                        <h2 className='hp'>{member.max_hp}</h2>
                                    </section>
                                    <section className='ac-hp-2'>
                                        <h2 className='hp'>Temp: {member.temp_hp}</h2>
                                        <h2 className='hp'>Current: {member.current_hp}</h2>
                                    </section>
                                </section>
                            </section>
                        ))
                    ) : (
                        <h1>Contact AutoDave to add a party to this campaign</h1>
                    )}
                </section>
            </main>
        )
    }
}

export default Campaign