import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { NewFarmModal } from '../NewFarmModal'
import {
  FarmButtonsBox,
  FarmDashboardContainer,
  FarmDashboardContent,
  FarmTableContainer,
} from './styles'

interface IFarm {
  codigo: string
  nome: string
}

function FarmDashboard() {
  const [isNewFarmModalOpen, setIsNewFarmModalOpen] = useState(false)
  const [farms, setFarms] = useState<IFarm[]>([])

  function handleOpenNewFarmModal() {
    setIsNewFarmModalOpen(true)
  }

  function handleCloseNewFarmModal() {
    setIsNewFarmModalOpen(false)
  }

  useEffect(() => {
    async function getFarmsData() {
      const response = await api.get<IFarm[]>('http://localhost:3000/api/farms')
      setFarms(response.data)
    }

    getFarmsData()
  }, [])

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
              {farms.map((item) => (
                <tr key={item.codigo}>
                  <td>{item.nome}</td>
                </tr>
              ))}
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
