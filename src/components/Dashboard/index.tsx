import React, { useState } from 'react'
import {
  ButtonsBox,
  DashboardContainer,
  DashboardContent,
  TableContainer,
} from './styles'

import { BiExport } from 'react-icons/bi'
import { NewReceiptModal } from '../NewReceiptModal'

function Dashboard() {
  const [isNewReceiptModalOpen, setIsNewReceiptModalOpen] = useState(false)

  function handleOpenNewReceiptModal() {
    setIsNewReceiptModalOpen(true)
  }

  function handleCloseNewReceiptModal() {
    setIsNewReceiptModalOpen(false)
  }

  return (
    <DashboardContainer>
      <DashboardContent>
        <ButtonsBox>
          <input placeholder="Pesquisar" type="search" />
          <button type="button" onClick={handleOpenNewReceiptModal}>
            Adicionar Recibo
          </button>
        </ButtonsBox>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Fazenda</th>
                <th>Numero</th>
                <th>Valor</th>
                <th>Extrato</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Fazenda 1</td>
                <td>1</td>
                <td>1000,00</td>
                <td>
                  <div className="imgButton">
                    <BiExport />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <NewReceiptModal
            isOpen={isNewReceiptModalOpen}
            onRequestClose={handleCloseNewReceiptModal}
          />
        </TableContainer>
      </DashboardContent>
    </DashboardContainer>
  )
}

export { Dashboard }
