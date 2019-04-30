import React from 'react';
import { Link } from '@reach/router';
import Container from './Conversation.styles';

import ApiUrl from './../Api/Api';

import ConversationMessage from './../ConversationMessage/ConversationMessage';

class Conversation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      conversation: {
        messages: []
      },
      messageText: ''
    }
  }

  /**
   * Get messages on component load
   */

  async componentDidMount() {

    try {
      const response = await fetch(
        `${ApiUrl}/conversation/${this.props.id}`, {
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
      const messages = await response.json();
      this.setState({
        loading: false,
        conversation: Object.assign(
          {},
          this.state.conversation,
          { messages: messages.concat(this.state.conversation.messages) })
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Submit message
   */

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.messageText.length) {
      this.publishMessage({
        authorImg: this.props.user.avatar,
        authorName: this.props.user.username,
        text: this.state.messageText,
      });
    }
  }

  /**
   * Put input value on state 
   */

  handleMessageChange = event => {
    event.preventDefault();
    this.setState({
      messageText: event.target.value
    });
  }

  /**
   * Publish message
   */

  async publishMessage(message) {
    try {
      const response = await fetch(
        `${ApiUrl}/conversation/${this.props.id}/messages`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message, conversationId: this.props.id }),
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const messageResponse = await response.json();
      this.setState({
        conversation: Object.assign(
          {},
          this.state.conversation,
          { messages: this.state.conversation.messages.concat([messageResponse]) }),
        messageText: ''
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Render component
   */

  render() {

    if (this.state.loading) {
      return <h1>Loading...</h1>
    }

    return (
      <Container>
        <div className="messages__list">
          {this.state.conversation.messages.map(message =>
            <ConversationMessage
              key={message.text}
              authorImg={message.authorImg}
              text={message.text}
            />
          )}
        </div>
        {this.props.loggedIn ? (<div className="messages__input">
          <form action="" onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              placeholder="Message"
              id="message"
              name="message"
              value={this.state.messageText}
              onChange={this.handleMessageChange}
            />
          </form>
        </div>) : null}
        <div className="messages__buttons">
          {this.props.loggedIn ? <button onClick={this.handleFormSubmit}>Send</button> : null}
          <Link to={'/'}>Go back</Link>
        </div>
      </Container>
    )
  }
}

export default Conversation;