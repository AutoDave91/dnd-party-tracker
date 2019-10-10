import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import '../style/header.css';

// import {getUser, logout} from '../reducks/reducer';

class Header extends Component {
    constructor(){
        super()
        this.state = {
            user: {},
            toggle: false
        }
    }

    componentDidMount(){
        // this.props.getUser()
    }

    render(){
        console.log(this.props.reducer)
        return(
            <main className='Header'>
                {this.props.reducer.user.username ? (
                    <section className='header-side'>
                        <h1>Welcome {this.props.reducer.user.username}!</h1>
                        <Link to='/profile'><button>Profile</button></Link>
                    </section>
                ) : (
                    <section className='header-side'>
                        <h1>Tank/Healer Guide</h1>
                    </section>
                )}
                <Link to='/'><section className='header-center'>
                    <img className='header-img' src='https://avatars1.githubusercontent.com/u/44700233?s=460&v=4' alt='logo'/>
                    <h1>AutoDave's D&D Aid</h1>
                </section></Link>
                {this.props.reducer.user.username ? (
                    <section className='header-side'>
                        <button onClick={this.props.logout}>Logout</button>
                    </section>
                ) : (
                    <section className='header-side'>
                        <button onClick={()=> console.log('User?')}>User?</button>
                    </section>
                )}
            </main>
        )
    }
}
const mapStateToProps = state => {
    return {
        reducer: state
    }
}
export default connect(mapStateToProps
    // , {getUser, logout}
    )(Header)