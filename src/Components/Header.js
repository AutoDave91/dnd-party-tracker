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
        console.log(this.props.reducer.user)
        return(
            <main className='Header'>
                {this.props.reducer.user.username ? (
                    <section className='header-side'>
                        <h1>Welcome {this.props.reducer.user.username}!</h1>
                        <Link to='/profile'><button>Profile</button></Link>
                    </section>
                ) : (
                    <div className='header-side'>
                        
                    </div>
                )}
                <section className='header-center'>
                    {/* <Link to='/'><img className='header-img' src='https://avatars1.githubusercontent.com/u/44700233?s=460&v=4' alt='logo'/></Link> */}
                    <Link to='/'><h1 className='title'>Tank/Healer Helper</h1></Link>
                    <Link to='/'><button className='home'>home</button></Link>
                </section>
                {this.props.reducer.user.username ? (
                    <section className='header-side'>
                        <button onClick={this.props.logout}><Link to='/'>Logout</Link></button>
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