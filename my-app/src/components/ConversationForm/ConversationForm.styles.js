import styled from '@emotion/styled';

const Container = styled('div') `
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, 0.8);
  z-index: 10;
  .conversation-form__container {
    width: 40%;
    min-width: 30rem;
    margin: auto;
    padding: 2rem;
    background-color: #FFF;
    form {
      display: flex;
      flex-flow: column;
      margin-bottom: 2rem;
      label, 
      p {
        margin-bottom: 0.5rem;
        line-height: 2.4rem;
        font-size: 1.8rem;
        font-weight: 600;
        color: #f56a2a;
      }
      input {
        margin-bottom: 1rem;
        line-height: 3rem;
        height: 3rem;
        border: 1px solid #999;
        border-radius: 3px;
      }
      p {
        margin: 0 0 1rem;
      }
    }
    .conversation-form__title {
      display: flex;
      flex-flow: column;
      margin-bottom: 2rem;
      input {
        margin-bottom: 0;
      }
    }
    .conversation-form__members {
      margin-bottom: 2rem;
      ul {
        display: flex;
        margin: 0;
        padding: 0;
        list-style-type: none;
        li {
          margin-right: 1rem;
          opacity: 0.5;
          img {
            display: block;
            width: 4rem;
            height: 4rem;
            margin: 0 auto;
            border-style: none;
            border-radius: 50%;
            border: 2px solid #f56a2a;
            cursor: pointer;
          }
           &.selected {
              opacity: 1;
          }
        }
      }
    }
    .conversation-form__privacy {
      display: flex;
      label {
        order: 2;
      }
      input {
        order: 1;
        align-self: center;
        width: 2.4rem;
        height: 2.4rem;
        margin-right: 0.5rem;
      }
    }
    .conversation-form__buttons {
      display: flex;
      justify-content: space-between;
      button {
        padding: 1rem 2rem;
        line-height: 1.8rem;
        text-decoration: none;
        font-size: 1.4rem;
        font-weight: 600;
        color: #FFF;
        background-color: #f56a2a;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      }
    }
  }
`;

export default Container;