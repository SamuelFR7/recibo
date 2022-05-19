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

  input,
  select,
  textarea {
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

  div {
    p {
      color: ${theme.colors.text};
      margin-bottom: 0.2rem;
    }

    select {
      padding: 0.5rem;
      width: 16rem;
      color: black;
    }

    input {
      padding: 0.5rem;
    }

    & + div {
      margin-left: 1.5rem;
    }
  }
`

export const RecipientBox = styled.div`
  padding: 1rem 0 0 0;
`

export const InputsBox = styled.div`
  padding: 1rem;

  p {
    font-size: 0.9rem;
  }

  input {
    padding: 0.5rem;
  }
`

export const NameBox = styled.div`
  input {
    width: 100%;
  }
`

export const InfosBox = styled.div`
  display: flex;
  margin-top: 0.4rem;
  justify-content: space-between;

  div {
    .endereco {
      width: 23rem;
    }
  }
`

export const DocumentBox = styled.div`
  display: flex;
  margin-left: 1rem;

  select {
    padding: 0.5rem;
    width: 8rem;
  }

  .documento {
    margin-left: 1rem;
  }
`

export const HistoricBox = styled.div`
  div {
    padding: 1rem;

    textarea {
      height: 5.5rem;
      padding: 0.3rem 0.5rem;
      width: 100%;
      resize: none;
    }
  }
`

export const SubmitBox = styled.div`
  padding: 1rem;
`
