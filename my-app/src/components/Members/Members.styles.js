import styled from '@emotion/styled';

const Container = styled('div') `
  padding: 2rem;
  .members__count {
    margin-bottom: 2rem;
    p {
      margin: 0 0 1rem;
      line-height: 1.8rem;
      font-size: 1.4rem;
      font-weight: 600;
      color: #f56b2a;
    }
  }
  .members__list {
    ul {
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      list-style-type: none;
      li {
        margin-bottom: 1.5rem;
        padding: 0 0.75rem;
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
    }
  }
`

export default Container;