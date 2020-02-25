import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import '../style/campaign.css';
import FullView from './FullView';

class Campaign extends Component {
    constructor(){
        super()
        this.state = {
            party: [],
            hp_change: 0,
            target: ''
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
        let {party, hp_change, target} = this.state;
        let partyCopy = [...party]
        for(let i=0; i < partyCopy.length; i++){
            let {name, temp_hp} =partyCopy[i]
            if(e.target.name === 'lvl_change'){
                partyCopy[i].lvl += 1;
            } else {
                if(name === target){
                    if(e.target.name === 'heal'){
                        if(partyCopy[i].current_hp += +hp_change > partyCopy[i].max_hp){
                            partyCopy[i].current_hp = partyCopy[i].max_hp;
                        } else {
                            partyCopy[i].current_hp += +hp_change;
                        }
                    } else if(e.target.name === 'damage') {
                        if(temp_hp >= +hp_change){
                            partyCopy[i].temp_hp -= +hp_change;
                        } else {
                            let rollOver = +hp_change - temp_hp
                            partyCopy[i].temp_hp = 0;
                            if(+rollOver > partyCopy[i].current_hp){
                                partyCopy[i].current_hp = 0
                            } else {
                                partyCopy[i].current_hp -= +rollOver;
                            }
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
                            <FullView member={member} i={i} component={'Campaign'}/>
                        ))
                    ) : (
                        <h1>Contact AutoDave to add a party to this campaign</h1>
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
export default connect(mapStateToProps)(Campaign)