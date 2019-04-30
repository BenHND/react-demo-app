import styled from '@emotion/styled';

const Container = styled('div') `
  padding: 2rem;
  label,
  input {
    display: block;
    line-height: 1.8rem;
    font-size: 1.4rem;
    font-weight: 600;
  }
  label {
    margin-bottom: 1rem;
    color: #f56b2a;
  }
  input {
    width: 100%;
    height: 4rem;
    margin-bottom: 1rem;
    padding: 0 1rem;
    border-radius: 3px;
    background: none;
    border: 1px solid #eeeeee;
    &[type="submit"]{
      margin: 2rem 0 0;
      background-color: #f56b2a;
      color: #FFF;
      border: none;
    }
  }
`

export default Container;