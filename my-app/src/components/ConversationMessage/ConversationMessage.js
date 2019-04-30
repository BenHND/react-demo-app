import React from 'react';
import Container from './ConversationMessage.styles';

const ConversationMessage = props => {
  return (
    <Container className="message">
      <div className="message__img">
        <img src={`/assets/images/content/${props.authorImg}`} alt="" />
      </div>
      <div className="message__text">
        <p>{props.text}</p>
      </div>
    </Container>
  )
}

export default ConversationMessage;