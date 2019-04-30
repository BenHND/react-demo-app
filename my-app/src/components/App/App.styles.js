
import styled from '@emotion/styled';

const Container = styled('div') `
  * {
    box-sizing: border-box;
  }
  .container {
    max-width: 118rem;
    margin: auto;
    padding: 0 1rem;
  }
  display: flex;
  justify-content: space-between;
  .container__left,
  .container__middle,
  .container__right {
    align-self: flex-start;
    margin-right: 2rem;
  }
  .container__left {
    width: calc((100% - 4rem) / 4);
    .user-bloc {
      margin-bottom: 2rem;
      background-color: #FFF;
      box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.16), 0 0.3rem 0.6rem rgba(0, 0, 0, 0.23);
      border-radius: 0.6rem;
    }
    .create-conversation-bloc {
      display: flex;
      button {
        margin: auto;
        padding: 1.5rem 3rem; 
        line-height: 1.8rem;
        font-size: 1.4rem;
        font-weight: 600;
        color: #FFF;
        background-color: #f56b2a;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      }
    }
  }
  .container__middle {
   width: calc((100% - 4rem) / 2);
   .content-bloc {
    margin-bottom: 2rem;
    background-color: #FFF;
    box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.16), 0 0.3rem 0.6rem rgba(0, 0, 0, 0.23);
    border-radius: 0.6rem;
   }
  }
  .container__right {
    width: calc((100% - 4rem) / 4);;
    margin-right: 0;
    .member-bloc {
      margin-bottom: 2rem;
      background-color: #FFF;
      box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.16), 0 0.3rem 0.6rem rgba(0, 0, 0, 0.23);
      border-radius: 0.6rem;
    }
  }
  @media screen and (max-width: 768px){
    flex-flow: column;
    .container__left,
    .container__middle,
    .container__right {
      margin: 0;
      width: 100%;
      .conversation__infos { 
        flex-flow: column;
        .converstion__time {
          margin-left: 0 !important; 
        }
      }
    }
    .create-conversation-bloc {
      margin-bottom: 2rem;
    }
  }
`;

export default Container;