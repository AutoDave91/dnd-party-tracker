import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import '../style/header.css';

import {getUser, logout} from '../reducks/reducer';

class Header extends Component {
    constructor(){
        super()
        this.state = {
            user: {},
            toggle: false
        }
    }

    componentDidMount(){
        this.props.getUser()
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
                <section className='header-center'>
                    <Link to='/'><img className='header-img' src={require('../assets/Pending.JPG')} alt='logo'/></Link>
                    <h1 className='title'>AutoDave's D&D Aid</h1>
                    <Link to='/'><button className='home'>home</button></Link>
                </section>
                {this.props.reducer.user.username ? (
                    <section className='header-side'>
                        <button onClick={this.props.logout}>Logout</button>
                    </section>
                ) : (
                    <section className='header-side'>
                        <Link to='/login'><button>User?</button></Link>
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
    , {getUser, logout}
    )(Header)