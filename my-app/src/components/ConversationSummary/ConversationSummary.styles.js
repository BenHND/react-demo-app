import styled from '@emotion/styled';

const Container = styled('div') `
  display: flex;
  width: 100%;
  .conversation__author {
    display: flex;
    width: 12rem;
    img {
      display: block;
      width: 7rem;
      height: 7rem;
      margin: 0 auto;
      border-style: none;
      border-radius: 50%;
      border: 4px solid #f56a2a;
    }
  }
  .conversation__content {
    width: calc(100% - 12rem);
    padding-right: 2rem;
    .conversation__infos {
      display: flex;
      margin-bottom: 3rem;
      .conversation__title {
        h2 {
          line-height: 2.1rem;
          font-size: 1.6rem;
          margin: 0;
          color: #000;
        }
      }
      .conversation__author-name {
        line-height: 2.1rem;
        font-size: 1.2rem;
        span {
          color: #999999;
        }
        &:before {
          content: '-';
          margin: 0 0.5rem;
          color: #999999;
        }
      }
      .converstion__time {
        margin-left: auto;
        line-height: 2.1rem;
        font-size: 1.2rem;
        font-weight: 600;
        color: #f56b2a;
      }
    }
    .conversation__details {
      display: flex;
      justify-content: space-between;
      .conversation__followers {
        .followers__count {
          margin-bottom: 1rem;
          span {
            font-weight: 600;
            color: #000;
          }
        }
        .followers__list {
          ul {
            display: flex;
            margin: 0;
            padding: 0;
            list-style-type: none;
            li {
              margin-right: 1rem;
              &:last-child {
                margin-right: 0;
              }
              img {
                display: block;
                width: 3.5rem;
                height: 3.5rem;
                margin: 0 auto;
                border-style: none;
                border-radius: 50%;
                border: 1px solid #f56a2a;
              }
            }
          }
        }
      }
      .conversation__status {
        align-self: flex-end;
        .fa {
          font-size: 1.4rem;
          color: #999999;
        }
      }
    }
  }
`;

export default Container;