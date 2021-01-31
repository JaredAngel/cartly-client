import React, { Component } from 'react'
import RegistrationForm from '../../RegistrationForm/RegistrationForm';

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <section className='Form'>
        <h2>Sign up</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
          handleLogin={this.props.handleLogin}
        />
      </section>
    );
  }
}

export default RegistrationRoute