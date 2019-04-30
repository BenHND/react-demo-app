import React from 'react';
import { Router } from '@reach/router';

import ApiUrl from './../Api/Api';

import Container from './App.styles';

import Header from './../Header/Header';
import Login from './../Login/Login';
import Profil from './../Profil/Profil';
import Conversation from './../Conversation/Conversation';
import ConversationList from './../ConversationList/ConversationList';
import Members from './../Members/Members';
import Modal from './../Modal/Modal';
import ConversationForm from './../ConversationForm/ConversationForm';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: {},
      users: [],
      showModal: false,
    }
    this.loggedIn = this.loggedIn.bind(this);
  }

  /**
   * check if user exists on App load
   */

  componentDidMount() {
    this.loggedIn();
    this.getUsers();
  }

  /**
   * Open create conversation modal
   */

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  /**
   * check if user is logged
   */

  loggedIn() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      loggedIn: !!user,
      user: user
    });
  }

  /**
   * check if user is logged
   */

  logout = () => {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user')
    }
    this.setState({
      loggedIn: false,
      user: {}
    });
  }

  /**
   * Get users
   */

  async getUsers() {
    try {
      const response = await fetch(
        `${ApiUrl}/users`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const users = await response.json();
      this.setState({
        users
      })

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Render App
   */

  render() {

    return (
      <React.Fragment>
        <Header />
        <main>
          <Container className="container">
            <div className="container__left">
              <div className="user-bloc">
                {this.state.loggedIn ? <Profil user={this.state.user} logout={this.logout} /> : <Login loggedIn={this.loggedIn} />}
              </div>
              {this.state.loggedIn ? (
                <div className="create-conversation-bloc">
                  <button onClick={this.toggleModal}>Create a new conversation</button>
                </div>
              ) : (null)}
            </div>
            <div className="container__middle">
              <div className="content-bloc">
                <Router>
                  <ConversationList
                    path="/"
                    user={this.state.user}
                    loggedIn={this.state.loggedIn}
                  />
                  <Conversation
                    path="/conversation/:id"
                    user={this.state.user}
                    loggedIn={this.state.loggedIn}
                  />
                </Router>
              </div>
            </div>
            <div className="container__right">
              <div className="member-bloc">
                <Members users={this.state.users} />
              </div>
            </div>
          </Container>
        </main>
        {
          this.state.showModal ? (
            <Modal>
              <ConversationForm
                user={this.state.user}
                users={this.state.users}
                toggleModal={this.toggleModal}
                loggedIn={this.loggedIn}
              />
            </Modal>
          ) : null
        }
      </React.Fragment>
    )
  }
}
export default App;