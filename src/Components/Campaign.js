import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Axios from 'axios';

import '../style/campaign.css';

class Campaign extends Component {
    constructor(){
        super()
        this.state = {
            party: [
                {campaign: 'sw5e 1', img: 'https://cdn.discordapp.com/attachments/316704555154800642/630934544375349248/Grayjedithetermgrayjediorgrayhadtwo_324b74_5788445.jpg', player: 'Wonsnot', name: 'Geoff', class: 'Consular', lvl: 4, max_hp: 11, ac: 13, current_hp: 11, temp_hp: 3, str: 12, dex: 16, con: 10, int: 11, wis: 10, cha: 16}, 
                {campaign: 'sw5e 1', img: 'https://i.pinimg.com/originals/11/56/d3/1156d37d76f884da477279fed684080b.jpg', player: 'AutoDave', name: 'O-yasha', class: 'Guardian', lvl: 4, max_hp: 20, ac: 15, current_hp: 18, temp_hp: 0, str: 15, dex: 10, con: 14, int: 11, wis: 17, cha: 10}, 
                {campaign: 'sw5e 1', img: '', player: 'NantanLupan', name: 'Gadget', class: 'Engineer', lvl: 4, max_hp: 35, ac: 0, current_hp: 0, temp_hp: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0}, 
                {campaign: 'sw5e 1', img: '', player: 'StormReavan', name: 'Vulcan', class: 'Operative', lvl: 4, max_hp: 0, ac: 0, current_hp: 0, temp_hp: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0},
                // {campaign: '', img: '', player: '', name: '', class: '', lvl: 0, max_hp: 0, ac: 0, current_hp: 0, temp_hp: 0, str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0}
            ]
        }
    }

    componentDidMount(){
        // Axios request to pull characters in this.props.match.params.name, then setState party to the results
    }
    // Axios request to send HP change to db

    render(){
        return(
            <main className='Campaign'>
                <h1>{this.props.match.params.name}</h1>
                <Link to='/'><button>back to home</button></Link>
                {/* input to receive number with 2x submit buttons (heal/harm), select to choose party member */}
                <section className='party'>
                {this.state.party.map((member, i) => (
                    <section className='member'>
                        <img className='party-pics' src={member.img} alt={member.name} />
                        <section className='character-info'>
                            <div className='name-class-player'>
                                <div className='slant'><h1 className='name'>{member.name}</h1></div>
                                <h2 className='class'>{member.class} ({member.lvl})</h2>
                                <h2 className='player'>controlled by: {member.player}</h2>
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
                            {/* <section className='ac-hp-2'>
                                <h2 className='hp'>Current: {member.current_hp}</h2>
                                <h2 className='hp'>Temp: {member.temp_hp}</h2>
                            </section> */}
                        </section>
                    </section>
                ))}
                </section>
            </main>
        )
    }
}

export default Campaign