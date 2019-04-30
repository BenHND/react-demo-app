import styled from '@emotion/styled';

const Container = styled('div') `
  padding: 2rem;
  .messages__list {
    margin-bottom: 2rem;
  }
  .messages__input {
    margin-bottom: 2rem;
    form {
      input {
        width: 100%;
        line-height: 3.8rem;
        font-size: 1.4rem;
        background: none;
        border: none;
        border-bottom: 2px solid #f56a2a;
      }
    }
  }
  .messages__buttons {
    display: flex;
    justify-content: space-between;
    button,
    a {
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
`
export default Container;