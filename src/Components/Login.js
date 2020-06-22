import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Axios from 'axios';

import {login, setUsername, setAdmin} from '../reducks/reducer';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            newUsername: '',
            newPassword: '',
            user: {},
            redirect: false,
            admin: false
        }

        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateUser = this.updateUser.bind(this)
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
        // console.log(this.state.username)
    }
    updateUser(user){
        this.setState({
            user,
        })
    }
    login(){
        let {username, password} = this.state;
        this.props.login(username, password)
        .then(user=>{
                // console.log(user.data.admin)
                // console.log(user)
                // console.log(username, password)
                this.setState({user: user.value.data, redirect: true});
                // console.log(user.data)
                // console.log('Logged in');
            })
            .catch(()=>{
                this.setState({username: '', password: ''});
                // console.log('Login failed in Login component');
            })
    }
    register(){
        let {newUsername, newPassword} = this.state;
        Axios.post('/auth/register', {newUsername, newPassword})
            .then(user=>{
                this.props.setUsername(user.data.username);
                this.setState({
                    newUsername: '',
                    newPassword: '',
                    redirect: true,
                });
                this.updateUser(user.data)
                alert('registered')
            })
            .catch(()=>{
                this.setState({
                    newUsername: '',
                    newPassword: ''
                })
                alert('error registering')
            })
    }

    render(){
        let {username, password, newUsername, newPassword} = this.state;

        return(
            <main className='login_register'>
                <Link to='/'><button>Home</button></Link>
                <section className='login_register2'>
                    <section className='login'>
                        <h1>Login</h1>
                        <input name='username' placeholder='username' value={username} onChange={this.handleChange}/>
                        <input name='password' placeholder='password' value={password} onChange={this.handleChange}/>
                        <button onClick={this.login}>Login</button>
                    </section>
                    <h2>OR</h2>
                    <section className='register'>
                        <h1>Register</h1>
                        <input name='newUsername' placeholder='username' value={newUsername} onChange={this.handleChange}/>
                        <input name='newPassword' placeholder='password' value={newPassword} onChange={this.handleChange}/>
                        <button onClick={this.register}>Sign Up</button>
                    </section>
                </section>
            </main>
        )
    }
}

const mapStateToProps = state =>{
    return {
        state
    }
}

export default connect(mapStateToProps, {login, setUsername, setAdmin})(Login);