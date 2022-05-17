import React, { useEffect, useState } from 'react'
import {
  ButtonsBox,
  DashboardContainer,
  DashboardContent,
  TableContainer,
} from './styles'

import { BiExport } from 'react-icons/bi'
import { NewReceiptModal } from '../NewReceiptModal'
import api from '../../services/api'

interface IReceipt {
  codigo: string
  fazenda: string
  numero: number
  data: Date
  valor: number
  historico: string
  beneficiarioNome: string
  beneficiarioEndereco: string
  beneficiarioDocumento: string
  pagadorNome: string
  pagadorEndereco: string
  pagadorDocumento: string
}

function Dashboard() {
  const [isNewReceiptModalOpen, setIsNewReceiptModalOpen] = useState(false)
  const [receipts, setReceipts] = useState<IReceipt[]>([])

  function handleOpenNewReceiptModal() {
    setIsNewReceiptModalOpen(true)
  }

  function handleCloseNewReceiptModal() {
    setIsNewReceiptModalOpen(false)
  }

  useEffect(() => {
    async function getReceiptsData() {
      const response = await api.get('/api/receipts')
      setReceipts(response.data)
    }

    getReceiptsData()
  }, [])

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
              {receipts.map((item) => (
                <tr key={item.codigo}>
                  <td>{item.fazenda}</td>
                  <td>{item.numero}</td>
                  <td>{item.valor}</td>
                  <td>
                    <div className="imgButton">
                      <BiExport />
                    </div>
                  </td>
                </tr>
              ))}
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
