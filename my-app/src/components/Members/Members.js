import React from 'react';
import Container from './Members.styles'

const Members = props => (
  <Container>
    <div className="members__count">
      <p>All members (5)</p>
    </div>
    <div className="members__list">
      <ul>
        {
          props.users.map(user => {
            return (
              <li key={user.id} value={user}>
                <img src={`/assets/images/content/${user.avatar}`} alt="" />
              </li>
            )
          })
        }
      </ul>
    </div>
  </Container>
)

export default Members;