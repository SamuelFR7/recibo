import styled from 'styled-components'
import { theme } from '../../styles/Theme'

export const SidebarContainer = styled.div`
  display: flex;
`

export const SidebarContent = styled.div`
  height: 100vh;
  padding: 2.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.green};
  color: #ffffff;
  border-radius: 0 1rem 1rem 0;
  align-items: center;
`

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    margin-top: 2rem;
  }

  p {
    font-size: 1rem;
    margin-top: 1rem;
  }
`

export const ButtonsContainer = styled.div`
  margin-top: 7rem;
  display: flex;
  flex-direction: column;

  button {
    font-size: 1.2rem;
    background: none;
    border: 0;
    color: #ffffff;
    background-color: ${theme.colors.green};
    padding: 0.5rem 7rem 0.5rem 1rem;
    border-radius: 1rem;
    text-align: left;

    :nth-last-child(1) {
      margin-top: 0.2rem;
    }

    &:hover {
      background: #3e5ba8;
    }

    &.active {
      background: #3e5ba8;
    }
  }
`
