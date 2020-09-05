import React, { Component } from 'react';
import "./style.css";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Typist from 'react-typist';
import logo from '/home/utpal/MoneyU/MoneyU/src/rupee.png';
import Spinner from 'react-bootstrap/Spinner';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import App from './App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillWaveAlt } from '@fortawesome/free-solid-svg-icons'

class Landing extends Component {

  state = {
        loggedIn: false,
        name: 'Utpal',
        date: new Date(),
        dark: false,
        incomes: [],
        expenses: [],
        success: null,
        failure: null,
        showlogin: false,
        showsignup: false,
    };

  componentDidMount() {
    document.body.style.background = "#e9ecef";
  }

  onSuccess = s => {
    let loggedIn = true;
    let success = s;
    this.setState({
      loggedIn,
      success
    });
    this.handleClose();
  }

  onFailure = s => {
    let loggedIn = false;
    this.setState({
      loggedIn
    });
  }

  handleClose = s => {
    let showlogin = false;
    let showsignup = false;
    this.setState({
        showlogin,
        showsignup
    });
  }

  signup = s => {
    let showsignup = true;
    this.setState({
      showsignup
    });
  }

  login = s => {
    let showlogin = true;
    this.setState({
      showlogin
    });
  }

  logout = s => {
    let loggedIn = false;
    this.setState({
      loggedIn
    });
  }

  render() {
    return (
      <div>
        <Jumbotron>
            <h1><span style={{color:'#1DCDFE'}}>money</span><u>U</u>
            <p style={{float:'right'}}>
                {!this.state.loggedIn && <Button variant="outline-dark" onClick={this.login}>Login</Button>}
                &nbsp;
                {!this.state.loggedIn && <Button variant="outline-dark" onClick={this.signup}>Signup</Button>}
                &nbsp;
                {this.state.loggedIn && <Button variant="outline-dark" onClick={this.logout}>Logout</Button>}
            </p>
            </h1>
            <br /><br /><br /><br />
            {!this.state.loggedIn && <div>
            <h1>
                <Typist>
                    Built For 
                    <span style={{color:'orange'}}> Business. </span>
                    <Typist.Backspace count={10} delay={200} />
                    <span style={{color:'purple'}}> Products. </span>
                    <Typist.Backspace count={10} delay={200} />
                    <span style={{color:'#1DCDFE'}}> Money. </span>
                </Typist>
                <Image style={{float:'right'}} src={logo} fluid/>
            </h1>
            <br /><br /><br /><br />
            <Button variant="outline-primary" size='lg'>Download App</Button>

            <Modal show={this.state.showlogin} onHide={this.handleClose}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
            >
                <Modal.Header closeButton>
                    <Modal.Title><h2>Login</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Username:</h4>
                    <input type='text' />
                    <h4>Password:</h4>
                    <input type='password' />
                </Modal.Body>
                <h3>
                    <Button variant="outline-secondary" onClick={this.handleClose} style={{marginLeft:'15px'}}>
                    Submit
                    </Button>
                </h3>
                <Modal.Footer>
                <GoogleLogin
                    clientId="1080114922441-5n4k7blcgdc5bu08j8h7r7njrf8tohjl.apps.googleusercontent.com"
                    ButtonText="Login with Google"
                    onSuccess={this.onSuccess}
                    onFailure={this.onFailure}
                    cookiePolicy={'single_host_origin'}
                    theme='dark'
                />
                </Modal.Footer>
            </Modal>
            <Modal show={this.state.showsignup} onHide={this.handleClose}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
            >
                <Modal.Header closeButton>
                    <Modal.Title><h2>Signup</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Username:</h4>
                    <input type='text' />
                    <h4>Password:</h4>
                    <input type='password' />
                </Modal.Body>
                <h3>
                    <Button variant="outline-secondary" onClick={this.handleClose} style={{marginLeft:'15px'}}>
                    Submit
                    </Button>
                </h3>
                <Modal.Footer>
                <GoogleLogin
                    clientId="1080114922441-5n4k7blcgdc5bu08j8h7r7njrf8tohjl.apps.googleusercontent.com"
                    ButtonText="Login with Google"
                    onSuccess={this.onSuccess}
                    onFailure={this.onFailure}
                    cookiePolicy={'single_host_origin'}
                    theme='dark'
                />
                </Modal.Footer>
            </Modal>
            </div>}
            {this.state.loggedIn && <App />}
        </Jumbotron>
      </div>
    );
  }
}

export default Landing;