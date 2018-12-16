import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { allowRegistration, disableBalanceOnAdd, disableBalanceOnEdit 
} from '../../actions/settingsActions';

class Settings extends Component {
    
  disableBalanceOnAddChange = () => {
      const {disableBalanceOnAdd} = this.props;
      disableBalanceOnAdd();
  }

  disableBalanceOnEditChange = () => {
    const {disableBalanceOnEdit} = this.props;
    disableBalanceOnEdit();
  }

  allowRegistrationChange = () => {
    const {allowRegistration} = this.props;
    allowRegistration();
  }

  render() {
    const { allowRegistration, disableBalanceOnAdd, disableBalanceOnEdit } = this.props.settings;
    return (
      <div>
        <div className='row'>
            <div className='col-md-6'>
                <Link to='/' className='btn btn-link'>
                    <i className='fas fa-arrow-circle-left'></i>{' '}Back To Dashboard
                </Link>
            </div>
        </div>
        <div className='card'>
            <div className='card-header'>
                Edit Settings
            </div>
            <div className='card-body'>
                <form>
                    <div className='form-group'>
                        <label>Allow Registration</label>{' '}
                        <input type='checkbox' name='allowRegistration' checked={!!allowRegistration}
                        onChange={this.allowRegistrationChange}/>
                    </div>
                    <div className='form-group'>
                        <label>Disable Balance On Add</label>{' '}
                        <input type='checkbox' name='disableBalanceOnAdd' checked={!!disableBalanceOnAdd}
                        onChange={this.disableBalanceOnAddChange}/>
                    </div>
                    <div className='form-group'>
                        <label>Disable Balance On Edit</label>{' '}
                        <input type='checkbox' name='disableBalanceOnEdit' checked={!!disableBalanceOnEdit}
                        onChange={this.disableBalanceOnEditChange}/>
                    </div>

                </form>
            </div>
        </div>
      </div>
    )
  }
}

Settings.propTypes = {
    settings: PropTypes.object.isRequired,
    allowRegistration: PropTypes.func.isRequired,
    disableBalanceOnAdd: PropTypes.func.isRequired,
    disableBalanceOnEdit: PropTypes.func.isRequired
}


export default connect( (state, props)=>({
    auth: state.firebase.auth,
    settings: state.settings
}),{allowRegistration, disableBalanceOnAdd, disableBalanceOnEdit})(Settings);