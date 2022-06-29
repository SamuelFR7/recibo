import styled from 'styled-components'
import { theme } from '../../styles/Theme'

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;

  h2 {
    color: ${theme.colors.text};
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  select {
    border: 1px solid #d7d7d7;
    font-weight: 400;
    font-size: 1rem;
  }

  button[type='submit'] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: ${theme.colors.green};
    color: #fff;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;
    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.9);
    }
  }
`

export const HighBox = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: ${theme.colors.text};
    margin-bottom: 0.2rem;
  }

  select {
    padding: 0.5rem;
    width: 100%;
  }
`
