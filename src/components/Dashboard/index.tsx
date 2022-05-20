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
import { useReceipts } from '../../hooks/useReceipts'
import { EditReceiptModal } from '../EditReceiptModal'
import { PaginationContainer } from '../Pagination'
import { IReceiptsRequest } from '../../interfaces/IRceiptsRequest'

function Dashboard() {
  const { receipts, setReceipts, currentPage } = useReceipts()
  const [isNewReceiptModalOpen, setIsNewReceiptModalOpen] = useState(false)
  const [isEditReceiptModalOpen, setIsEditReceiptModalOpen] = useState(false)
  const [receiptToEdit, setReceiptToEdit] = useState(0)

  function handleOpenNewReceiptModal() {
    setIsNewReceiptModalOpen(true)
  }

  function handleCloseNewReceiptModal() {
    setIsNewReceiptModalOpen(false)
  }

  function handleOpenEditReceiptModal(id: number) {
    setReceiptToEdit(id)
    setIsEditReceiptModalOpen(true)
  }

  function handleCloseEditReceiptModal() {
    setIsEditReceiptModalOpen(false)
  }

  async function handleDeleteReceipt(id: number) {
    await api.delete(`/api/recibo/${id}`)
    const response = await api.get<IReceiptsRequest>(
      `/api/recibo?PageNumber=${currentPage}`
    )
    setReceipts(response.data.data)
  }

  async function handlePrintOutReceipt(receiptId: number) {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL_API}/api/relatoriorecibo/unico?id=${receiptId}`
    )
  }

  useEffect(() => {
    async function getReceiptsData() {
      const response = await api.get<IReceiptsRequest>(
        `/api/recibo?PageNumber=${currentPage}`
      )
      setReceipts(response.data.data)
    }

    getReceiptsData()
  }, [currentPage])

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
                    <ImgButton
                      data-tip="Imprimir"
                      onClick={() => handlePrintOutReceipt(item.id)}
                    >
                      <BiExport size={32} />
                    </ImgButton>
                    <ReactTooltip effect="solid" />
                    <ImgButton
                      data-tip="Editar"
                      onClick={() => handleOpenEditReceiptModal(item.id)}
                    >
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
          <PaginationContainer />
          <NewReceiptModal
            isOpen={isNewReceiptModalOpen}
            onRequestClose={handleCloseNewReceiptModal}
          />
          <EditReceiptModal
            isOpen={isEditReceiptModalOpen}
            onRequestClose={handleCloseEditReceiptModal}
            receiptToEdit={receiptToEdit}
            setReceiptToEdit={setReceiptToEdit}
          />
        </TableContainer>
      </DashboardContent>
    </DashboardContainer>
  )
}

export { Dashboard }
