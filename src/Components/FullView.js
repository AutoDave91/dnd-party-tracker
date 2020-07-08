import React from 'react';

import '../style/full_view.css'

function Full_View(props){
    console.log(props.member)
    // let {campaign_id, character_id, token, character_name, party_role, lvl, character_class, max_hp, character_ac, current_hp, temp_hp, strength, dex, con, intel, wis, cha, health, active} = props.state
    return(
        <main className='FullView'>
            {props.edit === true && props.state.character_id === props.member.character_id ? (
                <div className='member' id='editCharacter'>
                <h3>Token Image</h3>
                <h3>Name: <input onChange={props.handleChange} className='character_name' placeholder={props.state.character_name} /></h3>
                <h3>Class: <input onChange={props.handleChange} className='character_class' placeholder={props.state.character_class} /></h3>
                <h3>Party Role: <input onChange={props.handleChange} className='party_role' placeholder={props.state.party_role} /></h3>
                <h3>Level: <input onChange={props.handleChange} className='lvl' placeholder={props.state.lvl} /></h3>
                <h3>Max HP: <input onChange={props.handleChange} className='max_hp' placeholder={props.state.max_hp} /></h3>
                <h3>AC: <input onChange={props.handleChange} className='character_ac' placeholder={props.state.character_ac} /></h3>
                <h3>Current HP: <input onChange={props.handleChange} className='current_hp' placeholder={props.state.current_hp} /></h3>
                <h3>Temp HP: <input onChange={props.handleChange} className='temp_hp' placeholder={props.state.temp_hp} /></h3>
                <h3>STR: <input onChange={props.handleChange} className='strength' placeholder={props.state.strength} /></h3>
                <h3>DEX: <input onChange={props.handleChange} className='dex' placeholder={props.state.dex} /></h3>
                <h3>CON: <input onChange={props.handleChange} className='con' placeholder={props.state.con} /></h3>
                <h3>INT: <input onChange={props.handleChange} className='intel' placeholder={props.state.intel} /></h3>
                <h3>WIS: <input onChange={props.handleChange} className='wis' placeholder={props.state.wis} /></h3>
                <h3>CHA: <input onChange={props.handleChange} className='cha' placeholder={props.state.cha} /></h3>
                <h3>Status for next session: <select onChange={props.handleChange} className='active'>
                    <option value={true}>Here</option>
                    <option value={false}>Away</option>
                </select></h3>
                <button onClick={props.handleClick} className='submit'>Submit</button>
            </div>
            ) : (
                <div className='member' id={props.member.party_role}>
                    <section className='pic-name'>
                        {`../assets/${props.member.character_name}.JPG` ?
                            <img className='party-pics' src={require('../assets/' + props.member.character_name + '.JPG')} alt={props.member.character_name} />
                            :
                            <image className='party-pics' src={require('../assets/Pending.JPG')} alt={props.member.character_name} />
                        }
                            <div className='name-class-player'>
                                <div className='slant-top'>
                                    <h1 className='name'>{props.member.character_name}</h1>
                                </div>
                                <div className='slant-bottom'>
                                    <h2 className='class'>{props.member.class} ({props.member.subclass}) ({props.member.lvl})</h2>
                                    {/* <h2 className='class'>{props.member.subclass}</h2> */}
                                    {props.component === 'Campaign' ? (
                                        // <h2 className='player'>controlled by: {props.member.player}</h2>
                                    <h2 className='player'>Party Role: {props.member.party_role}</h2>
                                    ) : (
                                        <button className='edit' onClick={props.editToggle}>Edit</button>
                                    )}
                                </div>
                            </div>
                    </section>
                    <section className='character-info'>
                        
                        <section className='ac-hp-1'>
                            <div className='ac-group'>
                                <h2 className='ac-title'>AC</h2>
                                <h2 className='ac'>{props.member.ac}</h2>
                            </div>
                            <div className='max-hp'>
                                <h2 className='max'>Max HP</h2>
                                <h2 className='hp'>{props.member.max_hp}</h2>
                            </div>
                        </section>
                        <section className='ac-hp-2'>
                            <div className='temp-hp'>
                                <h2 className='temp'>Temp HP</h2>
                                <h2 className='hp'>{props.member.temp_hp}</h2>
                            </div>
                            <div className='current-hp'>
                                <h2 className='current'>Current HP</h2>
                                <h2 className='hp'>{props.member.current_hp}</h2>
                            </div>
                        </section>
                        {props.crit === true ? 
                            <div></div>
                        : 
                            <ul className='ability-scores'>
                                <section className='ability-score'>
                                    <li>STR</li>
                                    <li className='ability-points'>{props.member.strength}</li>
                                </section>
                                <section className='ability-score'>
                                    <li>DEX</li>
                                    <li className='ability-points'>{props.member.dex}</li>
                                </section>
                                <section className='ability-score'>
                                    <li>CON</li>
                                    <li className='ability-points'>{props.member.con}</li>
                                </section>
                                <section className='ability-score'>
                                    <li>INT</li>
                                    <li className='ability-points'>{props.member.intel}</li>
                                </section>
                                <section className='ability-score'>
                                    <li>WIS</li>
                                    <li className='ability-points'>{props.member.wis}</li>
                                </section>
                                <section className='ability-score'>
                                    <li>CHA</li>
                                    <li className='ability-points'>{props.member.cha}</li>
                                </section>
                            </ul>
                        }
                    </section>
                </div>

                
            )}
        </main>
    )
}

export default Full_View;