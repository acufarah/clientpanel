import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { compose } from 'redux';
//import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

class Login extends Component {

  state= {
      email:'',
      password:''
  }

  onSubmit = e =>{
      e.preventDefault();

      const { firebase, history } = this.props;
      const { email, password } = this.state;

      firebase.auth().signInWithEmailAndPassword(email, password).catch(err => alert("Invalid Login Credentials")).then(history.push('/'));
  }

  onChange = e => this.setState({ [e.target.name] : e.target.value });


  render(){
    return (
      <div className='row'>
        <div className='col-md-6 mx-auto'>
            <div className='card'>
                <div className='card-body'>
                    <h1 className='text-center pb-4 pt-3'>
                        <span className='text-primary'>
                          <i className='fas fa-lock'/>{' '}
                          Login
                        </span>
                    </h1>
                    <form onSubmit={this.onSubmit}>
                        <div className='form-group'>
                            <label htmlFor="email">Email</label>
                            <input
                                type='email'
                                name='email'
                                className='form-control'
                                placeholder='email'
                                required
                                minLength='2'
                                onChange={this.onChange}
                                value={this.state.email}
                            
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                name='password'
                                className= 'form-control'
                                placeholder='password'
                                onChange={this.onChange}
                                required
                                minLength= '5'
                                value= {this.state.password}
                            />
                        </div>
                        <input
                            type='submit'
                            value='login'
                            className='btn btn-primary btn-block'
                        />
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default firebaseConnect()(Login);
