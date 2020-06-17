import React, {Component} from 'react';
import Axios from 'axios';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import '../style/campaign.css';
import FullView from './FullView';

class Campaign extends Component {
    constructor(){
        super()
        this.state = {
            campaign: '',
            party: [],
            initiative: [],
            hp_threshold: 5,
            hp_change: 0,
            target: '',
            crit: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        // this.party = this.party.bind(this)
    }

    componentDidMount(){
        let campaign = this.props.match.params.name;
        // console.log(campaign)
        Axios.post('/api/party/', {campaign})
            .then(res => {
                // console.log(campaign)
                this.setState({party: res.data, target: res.data[0].name, campaign: res.data[0].campaign})
            })
            .catch(()=> alert('Party failed to populate, please contact AutoDave if problem continues.'))
    }
    // Axios request to send HP change to db
    // party(){
    //     let party = []
    //     for(let i=0; i < this.props.reducer.data.length; i++){
    //         if(this.props.reducer.data[i].campaign === this.props.match.params.name){
    //             party.push(this.props.reducer.data[i])
    //         }
    //     }
    //     this.setState({...this.state, party: party, target: party[0].name})
    // }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
        // console.log(e.target.name, e.target.value)
    }
    handleClick(e){
        // console.log(this.state)
        let {campaign, party, hp_change, target, hp_threshold, initiative} = this.state;
        let partyCopy = [...party]
        let init = [...initiative]
        for(let i=0; i < partyCopy.length; i++){
            let {name, temp_hp, max_hp} =partyCopy[i]
            // level up party
            if(e.target.name === 'lvl_change'){
                // need rework to lvl up individuals
                if(name === target){
                    let effect = 'level'
                    partyCopy[i].lvl += 1;
                    Axios.put('/api/character', {campaign, target, effect})
                }
            } 
            // Long rest to restore current HP of party to max
            else if (e.target.name === 'long_rest'){
                partyCopy[i].current_hp = max_hp;
                partyCopy[i].health = 'ok';
            }
            // HP manipulation
            else {
                if(name === target){
                    let half = (max_hp / 2)
                    // Healing
                    if(e.target.name === 'heal'){
                        let effect = 'heal'
                        partyCopy[i].current_hp += +hp_change;
                            Axios.put('/api/character', {campaign, target, effect, hp_change})
                            if(partyCopy[i].current_hp > max_hp){
                                partyCopy[i].current_hp = max_hp
                            }
                            if(partyCopy[i].current_hp <= hp_threshold){
                                partyCopy[i].health = 'low';
                            } else if(partyCopy[i].current_hp > half) {
                                partyCopy[i].health = 'ok';
                            } else {
                                partyCopy[i].health = 'half';
                            }
                    }
                    // Damage
                    else if(e.target.name === 'damage') {
                        if(temp_hp >= +hp_change){
                            let effect = 'temp_loss'
                            partyCopy[i].temp_hp -= +hp_change;
                            Axios.put('/api/character', {campaign, target, effect, hp_change})
                        } else {
                            // need to make a request to reflect temp HP drain
                            let effect = 'damage'
                            let rollOver = +hp_change - temp_hp
                            partyCopy[i].temp_hp = 0;
                            if(+rollOver > partyCopy[i].current_hp){
                                partyCopy[i].current_hp = 0;
                                partyCopy[i].health = 'downed';
                            } else {
                                partyCopy[i].current_hp -= rollOver;
                                if(partyCopy[i].current_hp < 1){
                                    partyCopy[i].health = 'downed';
                                } else if(partyCopy[i].current_hp < hp_threshold){
                                    partyCopy[i].health = 'low';
                                } else if(partyCopy[i].current_hp <= half){
                                    partyCopy[i].health = 'half';
                                }
                            }
                            Axios.put('/api/character', {campaign, target, effect, hp_change})
                        }
                    }
                    // Temp HP
                    else if(e.target.name === 'temp') {
                        let effect = 'temp_gain'
                        partyCopy[i].temp_hp += +hp_change
                        Axios.put('/api/character', {campaign, target, effect})
                    }
                }
            }
            this.setState({party: partyCopy, hp_change: 0})
        }
        // Initiative Tracker
        if(e.target.name === 'init'){
            init.push({name: target, initiative: +hp_change});
            init.sort((a, b) => ( a.initiative > b.initiative) ? -1 : 1)
            this.setState({...party, hp_change: 0, initiative: init})
        }  else if(e.target.name === 'reset'){
            this.setState({...party, hp_change: 0, initiative: []})
        }
    }

    render(){
        return(
            <main className='Campaign'>
                <h1 className='title'>{this.props.match.params.name} Adventuring Party</h1>
                {/* hide buttons, input, and selection if user isn't a healer */}
                <div className='top'>
                    <section>
                        <div className='top-buttons'>
                            {/* <Link to='/'><button>back to home</button></Link> */}
                            <button name='long_rest' onClick={this.handleClick}>Long Rest</button>
                            {this.state.crit === false ? (
                                <button name='crit_change' onClick={()=>{this.setState({crit: !this.state.crit})}}>Combat View</button>
                                ) : (
                                    <button name='crit_change' onClick={()=>{this.setState({crit: !this.state.crit})}}>Full Stats</button>)
                                }
                            <button name='lvl_change' onClick={this.handleClick}>Level up!</button>
                        </div>
                        <section className='inputs'>
                            <input name='hp_change' type='number' value={this.state.hp_change} onChange={this.handleChange}/>
                            <select name='target' onChange={this.handleChange}>
                                {this.state.party.map((member, i) => (
                                    <option value={member.name}>{member.name}</option>
                                    ))}
                            </select>
                            <div>
                                <button className='damage' name='damage' onClick={this.handleClick}>damage</button>
                                <button name='temp' onClick={this.handleClick}>Temp</button>
                                <button className='heal' name='heal' onClick={this.handleClick}>healing</button>
                            </div>
                                <button name='init' onClick={this.handleClick}>Initiative</button>
                                <button name='reset' onClick={this.handleClick}>Reset Init</button>
                        </section>
                    </section>
                    <section>
                    {this.state.crit === true ? (
                        this.state.initiative[0] ? (
                            <section className='initiative'>
                                <h1>Initiative Tracker</h1>
                                {this.state.initiative.map((member, i) =>
                                (
                                    <h1>{member.name}: {member.initiative}</h1>
                                ))}
                            </section>
                        ) : (
                            <h1 className='roll-init'>Roll Initiative</h1>
                        )
                    ) : <h1 className='roll-init'>Initiative Tracker</h1>}
                    </section>
                </div>
                <section className='health'>
                    {this.state.crit === true ? (
                        this.state.party.map((member, i) => (
                                <h3 className={`${member.health}`}>{`${member.name}'s current hp: ${member.current_hp}`}</h3>
                        ))
                    ) : null }
                </section>
                <section className='party'>
                    {this.state.party[0] ? (
                        this.state.party.map((member, i) => (
                            <FullView member={member} i={i} component={'Campaign'} crit={this.state.crit} />
                        ))
                    ) : (
                        <h1>Contact AutoDave to add a party to this campaign</h1>
                    )}
                    {/* {this.state.crit === true ? (
                        this.state.initiative[0] ? (
                            <section className='initiative'>
                                <h1>Initiative Tracker</h1>
                                {this.state.initiative.map((member, i) =>
                                (
                                    <h1>{member.name}: {member.initiative}</h1>
                                ))}
                            </section>
                        ) : (
                            <h1 className='roll-init'>Roll Initiative</h1>
                        )
                    ) : null} */}
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
export default connect(mapStateToProps)(Campaign)