
import styled from '@emotion/styled';

const Container = styled('div') `
  display: flex;
  .message__img {
    margin-right: 2rem;
    margin-bottom: 2rem;
    img {
      display: block;
      width: 5.5rem;
      height: 5.5rem;
      margin: 0 auto;
      border-style: none;
      border-radius: 50%;
      border: 2px solid #f56a2a;
    }
  }
  .message__text{
    width: 100%;
    p {
      margin: 2rem 0 0;
      line-height: 1.8rem;
      font-size: 1.4rem;
    }
  }
`;

export default Container;