import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layout/alert';

class Register extends Component {

  state= {
      email:'',
      password:''
  }

  componentWillMount () {
    const { allowRegistration } = this.props.settings;

    if(!allowRegistration){
      this.props.history.push('/');
    }
  }

  onSubmit = e =>{
      e.preventDefault();

      const { firebase, notifyUser, history } = this.props;
      const { email, password } = this.state;
    
      //Register with firebase
      firebase.auth().createUserWithEmailAndPassword(email,password).catch( err => notifyUser('That user already exists.', 'error'));
  }
  onChange = e => this.setState({ [e.target.name] : e.target.value });


  render(){
    const { message, messageType } = this.props.notify;  
    return (
      <div className='row'>
        <div className='col-md-6 mx-auto'>
            <div className='card'>
                <div className='card-body'>
                    {message ? (
                        <Alert
                            message= {message}
                            messageType= {messageType}
                        />
                    ) 
                    : null }
                    <h1 className='text-center pb-4 pt-3'>
                        <span className='text-primary'>
                          <i className='fas fa-lock'/>{' '}
                          Register
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
                            value='Register'
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

Register.propTypes = {
    firebase: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state, props)=>({
        notify: state.notify,
        settings: state.settings
    }), 
    { notifyUser }
    )
)(Register);
