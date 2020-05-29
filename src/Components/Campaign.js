import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import '../style/campaign.css';
import FullView from './FullView';

class Campaign extends Component {
    constructor(){
        super()
        this.state = {
            party: [],
            initiative: [],
            hp_threshold: 5,
            hp_change: 0,
            target: '',
            crit: false
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
        for(let i=0; i < this.props.reducer.data.length; i++){
            if(this.props.reducer.data[i].campaign === this.props.match.params.name){
                party.push(this.props.reducer.data[i])
            }
        }
        this.setState({...this.state, party: party, target: party[0].name})
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    handleClick(e){
        // console.log(this.state)
        let {party, hp_change, target, hp_threshold, initiative} = this.state;
        let partyCopy = [...party]
        let init = [...initiative]
        for(let i=0; i < partyCopy.length; i++){
            let {name, temp_hp, max_hp} =partyCopy[i]
            if(e.target.name === 'lvl_change'){
                partyCopy[i].lvl += 1;
            } else if (e.target.name === 'long_rest'){
                partyCopy[i].current_hp = max_hp;
                partyCopy[i].health = 'ok';
            } else {
                if(name === target){
                    let half = (max_hp / 2)
                    if(e.target.name === 'heal'){
                        partyCopy[i].current_hp += +hp_change;
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
                    } else if(e.target.name === 'damage') {
                        if(temp_hp >= +hp_change){
                            partyCopy[i].temp_hp -= +hp_change;
                        } else {
                            let rollOver = +hp_change - temp_hp
                            partyCopy[i].temp_hp = 0;
                            if(+rollOver > partyCopy[i].current_hp){
                                partyCopy[i].current_hp = 0;
                                partyCopy[i].health = 'downed';
                            } else {
                                partyCopy[i].current_hp -= rollOver;
                                // console.log(partyCopy[i].current_hp)
                                if(partyCopy[i].current_hp < 1){
                                    // console.log('hit')
                                    partyCopy[i].health = 'downed';
                                } else if(partyCopy[i].current_hp < hp_threshold){
                                    partyCopy[i].health = 'low';
                                } else if(partyCopy[i].current_hp <= half){
                                    partyCopy[i].health = 'half';
                                }
                            }
                        }
                    } else if(e.target.name === 'temp') {
                        partyCopy[i].temp_hp += +hp_change
                    }
                }
            }
            this.setState({party: partyCopy, hp_change: 0})
        }
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