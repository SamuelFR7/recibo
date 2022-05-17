import styled from 'styled-components'
import { theme } from '../../styles/Theme'

export const DashboardContainer = styled.div``

export const DashboardContent = styled.div`
  padding: 10rem 10rem;
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
