import React from 'react'
import { ButtonsBox, DashboardContainer, DashboardContent } from './styles'

function Dashboard() {
  return (
    <DashboardContainer>
      <DashboardContent>
        <ButtonsBox>
          <input placeholder="Pesquisar" type="search" />
          <button type="button">Adicionar Recibo</button>
        </ButtonsBox>
      </DashboardContent>
    </DashboardContainer>
  )
}

export { Dashboard }
