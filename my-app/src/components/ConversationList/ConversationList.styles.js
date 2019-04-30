import styled from '@emotion/styled';

const Container = styled('div') `
  & > ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
      & > li {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: none;
      }
      a {
        display: block;
        width: 100%;
        padding: 2rem 0;
        text-decoration: none;
      }
    }
  }
`;

export default Container;