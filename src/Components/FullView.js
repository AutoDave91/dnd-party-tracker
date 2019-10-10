import React from 'react';

import '../style/full_view.css'

function Full_View(props){
    return(
        <section className='member'>
            <img className='party-pics' src={props.member.img} alt={props.member.name} />
            <section className='character-info'>
                <div className='name-class-player'>
                    <div className='slant-top'>
                        <h1 className='name'>{props.member.name}</h1>
                    </div>
                    <div className='slant-bottom'>
                        <h2 className='class'>{props.member.class} ({props.member.lvl})</h2>
                        {props.component === 'Campaign' ? (
                            <h2 className='player'>controlled by: {props.member.player}</h2>
                        ) : (
                            <h2 className='player'>{props.member.campaign}</h2>
                        )}
                    </div>
                </div>
                <ul className='ability-scores'>
                    <section className='ability-score'>
                        <li>STR</li>
                        <li className='ability-points'>{props.member.str}</li>
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
                        <li className='ability-points'>{props.member.int}</li>
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
                <section className='ac-hp-1'>
                    <div className='ac-group'>
                        <h2 className='ac-title'>AC</h2>
                        <h2 className='ac'>{props.member.ac}</h2>
                    </div>
                    <div className='max-hp'>
                        <h2 className='max'>Max</h2>
                        <h2 className='hp'>{props.member.max_hp}</h2>
                    </div>
                </section>
                <section className='ac-hp-2'>
                    <div className='temp-hp'>
                        <h2 className='temp'>Temp</h2>
                        <h2 className='hp'>{props.member.temp_hp}</h2>
                    </div>
                    <div className='current-hp'>
                        <h2 className='current'>Current</h2>
                        <h2 className='hp'>{props.member.current_hp}</h2>
                    </div>
                </section>
            </section>
        </section>
    )
}

export default Full_View;