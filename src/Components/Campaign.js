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
            crit: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        // this.party = this.party.bind(this)
    }

    componentDidMount(){
        let campaign = this.props.match.params.name;
        // console.log(campaign)
        Axios.get(`/api/party?campaign=${campaign}`)
            .then(res => {
                // console.log(res.data)
                this.setState({party: res.data, target: res.data[0].name, campaign: res.data[0].campaign})
                // this.setState({party: res.data, target: res.data[0].character_name, campaign: res.data[0].campaign})
            })
            .catch(()=> alert('Party failed to populate, please contact AutoDave if problem continues.'))
        Axios.get('/api/initiative')
            .then(res => this.setState({initiative: res.data}))
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
        // console.log(e.target.name, e.target.value)
    }
    handleClick(e){
        // console.log(this.state)
        let {campaign, hp_change, target} = this.state;
        let {name} = e.target;
        
        // --------Level manipulation-------
        if(name === 'lvl_change'){
            let effect = 'level'
            Axios.put('/api/character', {campaign, target, effect})
                .then(res => this.setState({party: res.data}))
            alert(`Congrats ${target} on leveling up!`)
        } 
        // ---------HP manipulation---------
        // Healing
        if(name === 'heal'){
            let effect = 'heal'
            Axios.put('/api/character', {campaign, target, effect, hp_change})
                .then(res => {this.setState({party: res.data})})
        }
        // Damage & Temp HP loss
        if(name === 'damage') {
            let effect = 'damage'
            Axios.put('/api/character', {campaign, target, effect, hp_change})
                .then(res => this.setState({party: res.data}))
        }
        // Temp HP gain
        else if(name === 'temp') {
            let effect = 'temp_gain'
            Axios.put('/api/character', {campaign, target, effect, hp_change})
                .then(res => this.setState({party: res.data}))
        }
        // Long Rest
        else if(name === 'long_rest'){
            Axios.put('/api/party', {campaign})
                .then(res => this.setState({party: res.data}))
            alert(`Glad y'all got a long rest in!`)
        }
        // Initiative
        else if(name === 'init'){
            // add check to see if character already has init
                // if true: prompt if they want to replace the init
                    // if yes: send command to replace the init
                    // if no: close popup
            Axios.post('/api/initiative', {target, hp_change})
            .then(res => {this.setState({initiative: res.data}); console.log(this.state.initiative)})
        } else if(name === 'reset'){
            Axios.delete('/api/initiative')
            this.setState({initiative: []})
        }
        this.setState({hp_change: 0})
    }

    render(){
        return(
            <main className='Campaign'>
                <h1 className='title' id='campaign-title'>{this.props.match.params.name} Adventuring Party</h1>
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
                                    <option value={member.character_name}>{member.name}</option>
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
                    {this.state.initiative[0] ? (
                            <section className='initiative'>
                                <h1>Initiative Tracker</h1>
                                {this.state.initiative.map((member, i) =>
                                (
                                    <h1>{member.name}: {member.value}</h1>
                                ))}
                            </section>
                        ) : (
                            <h1 className='roll-init'>Roll Initiative</h1>
                        )
                    }
                    </section>
                </div>
                <section className='health'>
                    {this.state.crit === true ? (
                        this.state.party.map((member, i) => (
                                <h3 id='charHealth' className={`${member.health}`}>{`${member.name}'s current hp: ${member.current_hp}/${member.max_hp}`}</h3>
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