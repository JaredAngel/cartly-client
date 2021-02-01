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
        <h1>Sign up</h1>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
          handleLogin={this.props.handleLogin}
          viewLanding={this.props.viewLanding}
        />
      </section>
    );
  }
}

export default RegistrationRoute