import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'
import './RegistrationForm.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { firstname, lastname, username, password } = ev.target
    AuthApiService.postUser({
      firstname: firstname.value,
      lastname: lastname.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        firstname.value = ''
        lastname.value = ''
        username.value = ''
        password.value = ''
        this.submitLogin();
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  submitLogin = () => {
    this.props.handleLogin();
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
    <div className='Registration_Form'>
      <form
        onSubmit={this.handleSubmit}
        className='RegistrationForm'
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <label htmlFor='registration-firstname-input'>
            Enter your first name {' '}
          </label>
          <input
            ref={this.firstInput}
            id='registration-firstname-input'
            name='firstname'
            required
          />
        </div>
        <div>
          <label htmlFor='registration-lastname-input'>
            Enter your last name {' '}
          </label>
          <input
            id='registration-lastname-input'
            name='lastname'
            required
          />
        </div>
        <div>
          <label htmlFor='registration-username-input'>
            Choose a username {' '}
          </label>
          <input
            id='registration-username-input'
            name='username'
            required
          />
        </div>
        <div>
          <label htmlFor='registration-password-input'>
            Choose a password {' '}
          </label>
          <input
            id='registration-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <footer>
          <button type='submit'>
            Sign up
          </button>
          {' '}
        </footer>
      </form>
      <div>
      <button
        onClick={this.submitLogin}
      >
        Login
      </button>
      <button type='button' onClick={this.props.viewLanding}>
          What Is Cartly?
        </button>
      </div>
      
    </div>
    )
  }
}

export default RegistrationForm;