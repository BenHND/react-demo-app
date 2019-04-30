import React from 'react';
import { Link } from '@reach/router';
import Container from './ConversationList.styles';

import ApiUrl from './../Api/Api'

import ConversationSummary from './../ConversationSummary/ConversationSummary';

class ConversationList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: this.props.loggedIn,
      conversations: []
    }
  }

  /**
   * On component load, get conversations summaries list
   */

  componentDidMount() {
    if (this.props.user && this.props.user.conversationId) {
      this.getConversations(this.props.user.conversationId)
    } else {
      this.getConversations(null);
    }
  }

  /**
   * When user login / logout, update conversations list
   */

  componentDidUpdate(prevProps, prevState) {
    if (this.props.loggedIn !== prevProps.loggedIn && this.props.user) {
      this.getConversations(this.props.user.conversationId);
    }
  }

  /**
   * get conversation
   */

  async getConversations(conversationId) {
    try {
      const response = await fetch(
        `${ApiUrl}/conversations`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: conversationId ? JSON.stringify(conversationId) : [],
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const conversations = await response.json();
      this.setState({
        conversations
      })

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Render Component
   */

  render() {
    return (
      <Container className="conversation-list-bloc">
        <ul>
          {
            this.state.conversations.map(conversation => {
              return (
                <li key={conversation.title}>
                  <Link to={`/conversation/${conversation.id}`}>
                    <ConversationSummary
                      authorPic={conversation.authorImg}
                      title={conversation.title}
                      username={conversation.authorName}
                      time={conversation.time}
                      participantsCount={conversation.membersImg.length}
                      participantsImages={conversation.membersImg}
                      publicMessage={conversation.publicMessage}
                    />
                  </Link>
                </li>
              )

            })
          }
        </ul>
      </Container>
    )
  }
}
export default ConversationList;