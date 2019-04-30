import React from 'react';
import Container from './ConversationSummary.styles';

class ConversationSummary extends React.Component {

  /**
   * Render component
   */

  render() {

    const { authorPic, title, username, time, participantsCount, participantsImages, publicMessage } = this.props;

    return (
      <Container>
        <div className="conversation__author">
          <img src={`./assets/images/content/${authorPic}`} alt="" />
        </div>
        <div className="conversation__content">
          <div className="conversation__infos">
            <div className="conversation__title">
              <h2>{title}</h2>
            </div>
            <div className="conversation__author-name">
              <span>@{username}</span>
            </div>
            <div className="converstion__time">
              <span>{time}</span>
            </div>
          </div>
          <div className="conversation__details">
            <div className="conversation__followers">
              <div className="followers__count">
                <span>{participantsCount + 1} participants</span>
              </div>
              <div className="followers__list">
                <ul>
                  {
                    participantsImages.map(image => {
                      return <li key={image}><img src={`./assets/images/content/${image}`} alt="" /></li>
                    })
                  }
                </ul>
              </div>
            </div>
            {publicMessage ? null : (<div className="conversation__status">
              <span className="converstion__status-icon"><i className="fa fa-lock"></i></span>
            </div>)}
          </div>
        </div>
      </Container>)
  }
}
export default ConversationSummary;