import React, { useState } from 'react'
import { NewFarmModal } from '../NewFarmModal'
import {
  FarmButtonsBox,
  FarmDashboardContainer,
  FarmDashboardContent,
  FarmTableContainer,
} from './styles'

function FarmDashboard() {
  const [isNewFarmModalOpen, setIsNewFarmModalOpen] = useState(false)

  function handleOpenNewFarmModal() {
    setIsNewFarmModalOpen(true)
  }

  function handleCloseNewFarmModal() {
    setIsNewFarmModalOpen(false)
  }

  return (
    <FarmDashboardContainer>
      <FarmDashboardContent>
        <FarmButtonsBox>
          <input placeholder="Pesquisar" type="search" />
          <button type="button" onClick={handleOpenNewFarmModal}>
            Adicionar Fazenda
          </button>
        </FarmButtonsBox>
        <FarmTableContainer>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Fazenda 1</td>
              </tr>
            </tbody>
          </table>
          <NewFarmModal
            isOpen={isNewFarmModalOpen}
            onRequestClose={handleCloseNewFarmModal}
          />
        </FarmTableContainer>
      </FarmDashboardContent>
    </FarmDashboardContainer>
  )
}

export { FarmDashboard }
