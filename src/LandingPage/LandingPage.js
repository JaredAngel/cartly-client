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

  viewLanding = () => {
    this.setState({
      showLanding: true,
      showApp : false,
      showLogin: false,
      showRegister: false
    })
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
            <h1>Welcome to Cartly!</h1>
            <h2>About Us</h2>
            <p>
              Cartly allows you to log your favorite recipes in your own private journal. Making it easier to keep a list of all required ingredients handy for grocery shopping!
              <br />
              <br />
              Simply create or log-in to your account and start putting together your next grocery shopping list.
              <br />
              <br />
              Demo Account: BobbyJoe , My123!@#
            </p>
            <button
              className='Begin__Carting' 
              onClick={this.handleRegister}
            >
              Begin!
            </button>
          </div>
        }

        {this.state.showRegister && <RegistrationRoute viewLanding={this.viewLanding} handleLogin={this.handleLogin}/>}
        {this.state.showLogin && <LoginRoute viewLanding={this.viewLanding} handleRegister={this.handleRegister} showApp={this.beginCarting}/>}
        {this.state.showApp && <App logout={this.handleRegister}/>}
      </>
    );
  }
}