import styled from 'styled-components'
import { theme } from '../../styles/Theme'

export const DashboardContainer = styled.div``

export const DashboardContent = styled.div`
  padding: 9rem 10rem;
`

export const ButtonsBox = styled.div`
  display: flex;

  button {
    margin-left: 2rem;
    font-size: 1rem;
    color: #fff;
    background: ${theme.colors.green};
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;
    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.9);
    }
  }

  input {
    padding: 1rem 2rem;
    border: 0;
    border-radius: 0.25rem;
    width: 65vw;
  }
`

export const TableContainer = styled.div`
  margin-top: 2rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: ${theme.colors.textBody};
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: ${theme.colors.shape};
      color: ${theme.colors.text};

      div {
        padding-top: 0.3rem;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`
