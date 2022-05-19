import React, { useEffect, useState } from 'react'
import {
  ButtonsBox,
  DashboardContainer,
  DashboardContent,
  ImgButton,
  TableContainer,
} from './styles'

import ReactTooltip from 'react-tooltip'
import { BiExport, BiPencil, BiTrash } from 'react-icons/bi'
import { NewReceiptModal } from '../NewReceiptModal'
import api from '../../services/api'
import { IReceipt } from '../../interfaces/IReceipt'

function Dashboard() {
  const [isNewReceiptModalOpen, setIsNewReceiptModalOpen] = useState(false)
  const [receipts, setReceipts] = useState<IReceipt[]>([])

  function handleOpenNewReceiptModal() {
    setIsNewReceiptModalOpen(true)
  }

  function handleCloseNewReceiptModal() {
    setIsNewReceiptModalOpen(false)
  }

  async function handleDeleteReceipt(id: number) {
    await api.delete(`/api/recibo/${id}`)
    const response = await api.get<IReceipt[]>('/api/recibo')
    setReceipts(response.data)
  }

  useEffect(() => {
    async function getReceiptsData() {
      const response = await api.get<IReceipt[]>('/api/recibo')
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
                <th>Beneficiario</th>
                <th>Numero</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {receipts.map((item) => (
                <tr key={item.id}>
                  <td>{item.fazenda.nome}</td>
                  <td>{item.beneficiarioNome}</td>
                  <td>{item.numero}</td>
                  <td className="valor">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(item.valor)}
                  </td>
                  <td>
                    <ReactTooltip effect="solid" />
                    <ImgButton data-tip="Imprimir">
                      <BiExport size={32} />
                    </ImgButton>
                    <ReactTooltip effect="solid" />
                    <ImgButton data-tip="Editar">
                      <BiPencil size={32} />
                    </ImgButton>
                    <ReactTooltip effect="solid" />
                    <ImgButton
                      data-tip="Excluir"
                      onClick={() => {
                        if (
                          window.confirm(
                            'Certeza de que você deseja deletar este item?'
                          )
                        )
                          handleDeleteReceipt(item.id)
                      }}
                    >
                      <BiTrash size={32} />
                    </ImgButton>
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
