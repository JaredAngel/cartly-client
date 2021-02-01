import React, { Component } from 'react'
import LoginForm from '../../LoginForm/LoginForm';

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className='Form'>
        <h1>Login</h1>
        <div className='demo-account'>
          <p>Demo Account:</p>
          <p>Username | BobbyJoe</p>
          <p>Password | My123!@#</p>
        </div>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
          showApp={() => this.props.showApp()}
          viewLanding={this.props.viewLanding}
          viewRegister={this.props.handleRegister}
        />
      </section>
    );
  }
}

export default LoginRoute