import React, { Component } from 'react';
import App from '../App/App';
import LoginRoute from '../routes/LoginRoute/LoginRoute';
import RegistrationRoute from '../routes/RegistrationRoute/RegistrationRoute';
import TokenService from '../services/token-service';
import './LandingPage.css';

export default class LandingPage extends Component{
  state = {
    showLanding: true,
    showApp : false,
    showLogin: false,
    showRegister: false
  }

  beginCarting = () => {
    this.setState({
      showApp: true,  
      showLogin: false,
      showRegister: false,
      showLanding: false
    })
  }

  handleRegister = () => {
    if(!TokenService.hasAuthToken()){
      this.setState({
        showRegister: true,
        showLogin: false,
        showApp: false,
        showLanding: false
      });
    } else {
      this.beginCarting();
    }
  }

  handleLogin = () => {
    console.log(this.state.showLogin)
    this.setState({
      showLogin: true,
      showApp: false,
      showRegister: false,
      showLanding: false
    })
  }

  render() {
    return (
      <>
        {this.state.showLanding && 
          <div className='LandingPage'>
            <h2>Welcome to Cartly!</h2>
            <p>
              Cartly allows you to log your favorite recipes in your own private journal. Making it easier to keep a list of all required ingredients handy for grocery shopping!
              <br />
              <br />
              Simply create or log-in to your account and start putting together your next grocery shopping list.
            </p>
            <button
              className='Begin__Carting' 
              onClick={this.handleRegister}
            >
              Begin!
            </button>
          </div>
        }

        {this.state.showRegister && <RegistrationRoute handleLogin={this.handleLogin}/>}
        {this.state.showLogin && <LoginRoute showApp={this.beginCarting}/>}
        {this.state.showApp && <App logout={this.handleRegister}/>}
      </>
    );
  }
}