import styled from 'styled-components'
import { theme } from '../../styles/Theme'

export const SidebarContainer = styled.div`
  display: flex;
  height: 68rem;
`

export const SidebarContent = styled.div`
  padding: 2.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.green};
  color: #ffffff;
  border-radius: 0 1rem 1rem 0;
  align-items: center;
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

    div {
      display: flex;
      align-items: center;

      p {
        margin-left: 0.5rem;
      }
    }
  }
`
