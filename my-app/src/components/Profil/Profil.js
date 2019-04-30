import React from 'react';
import Container from './Profil.styles';

const Profil = props => (
  <Container className="user-profil">
    <img src={`/assets/images/content/${props.user.avatar}`} alt="" />
    <h2>@{props.user.username}</h2>
    <a href="#" className="logout" onClick={props.logout}>Logout</a>
  </Container>
)

export default Profil;