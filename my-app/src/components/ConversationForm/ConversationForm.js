import React from 'react';
import { navigate } from '@reach/router';

import ApiUrl from './../Api/Api';

import Container from './ConversationForm.styles';

class ConversationForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      selectedUsers: [],
      publicMessage: true
    }
  }

  /**
   * Add  user from state on avatar click
   */

  handleToggleMembers(event, user) {
    if (!this.state.selectedUsers.filter(
      selectedUser => selectedUser.id === user.id).length > 0) {
      this.setState({
        selectedUsers: this.state.selectedUsers.concat(user)
      });
      event.target.parentElement.classList.add('selected')
    } else {
      this.removeSelectedUser(user, event.target);
    }
  }

  /**
   * Remove user from state
   */

  removeSelectedUser(user, target) {
    target.parentElement.classList.remove('selected')
    this.setState({
      selectedUsers: this.state.selectedUsers.filter(
        selectedUser => selectedUser.id !== user.id
      )
    });
  }

  /**
   * Update user conversations
   */

  updateUserConversations(newConversation) {
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    userObj.conversationId.push(newConversation.id);
    localStorage.setItem('user', JSON.stringify(userObj));
    this.props.loggedIn();
  }

  /**
   * Create new conversation
   */

  async createconversation(conversation) {
    try {
      const response = await fetch(
        `${ApiUrl}/create`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(conversation),
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const newConversation = await response.json();
      this.toggleModal();
      this.updateUserConversations(newConversation);
      navigate(`/conversation/${newConversation.id}`);

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * on submit form
   */

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.selectedUsers.length && this.state.title.length) {
      const users = this.state.selectedUsers;
      users.push(this.props.user);
      this.createconversation({
        user: this.props.user,
        title: this.state.title,
        publicMessage: this.state.publicMessage,
        users: users,
      });
    }
  }

  /**
   * Put input value on state 
   */

  handleMessageChange = event => {
    event.preventDefault();
    this.setState({
      title: event.target.value
    });
  }

  /**
   * Set selected privacy on state
   */

  handlePrivacyChange = event => {
    this.setState({ publicMessage: !event.target.checked });
  }

  /**
   * toggle modal
   */

  toggleModal = () => {
    this.props.toggleModal();
  }

  /**
   * Render Component
   */

  render() {
    return (
      <Container className="conversation-form">
        <div className="conversation-form__container">
          <form action="" onSubmit={this.handleFormSubmit}>
            <div className="conversation-form__title">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                name="title"
                id="title"
                value={this.state.messageText}
                onChange={this.handleMessageChange}
              />
            </div>
            <div className="conversation-form__members">
              <p>Add participants *</p>
              <ul>
                {
                  this.props.users.map(user => {
                    return (
                      this.props.user.id !== user.id ? (<li
                        key={user.username}
                        value={user}
                        onClick={(e) => this.handleToggleMembers(e, user)}
                      >
                        <img src={`/assets/images/content/${user.avatar}`} alt="" />
                      </li>) : null
                    )
                  })
                }
              </ul>
            </div>
            <div className="conversation-form__privacy">
              <label htmlFor="title">Private conversation</label>
              <input
                type="checkbox"
                name="title"
                id="title"
                onChange={this.handlePrivacyChange}
              />
            </div>
          </form>
          <div className="conversation-form__buttons">
            <button onClick={this.toggleModal}>Cancel</button>
            <button onClick={this.handleFormSubmit}>Create</button>
          </div>
        </div>
      </Container>
    )
  }
}
export default ConversationForm;