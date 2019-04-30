import styled from '@emotion/styled';

const Container = styled('div') `
  display: flex;
  flex-flow: column;
  padding: 2rem;
  img {
    display: block;
    width: 10rem;
    height: 10rem;
    margin: 0 auto 2rem;;
    border-style: none;
    border-radius: 50%;
    border: 4px solid #f56a2a;
  }
  h2 {
    margin: 0 auto 1rem;
    line-height: 2.4rem;
    font-size: 1.8rem;
    font-weight: 600;
    color: #000;
  }
  a {
    margin: 0 auto;
    line-height: 1.8rem;
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 600;
    color: #f56a2a;
  }
`

export default Container;