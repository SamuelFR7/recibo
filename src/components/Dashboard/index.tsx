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
import { PrintListModal } from '../PrintListModal'
import { SearchInput } from '../SearchInput'
import { PrintReceiptsModal } from '../PrintAllReceiptsModal'

function Dashboard() {
  const { receipts, setReceipts, currentPage, setReceiptsLength, search } =
    useReceipts()
  const [isNewReceiptModalOpen, setIsNewReceiptModalOpen] = useState(false)
  const [isEditReceiptModalOpen, setIsEditReceiptModalOpen] = useState(false)
  const [isPrintListModalOpen, setIsPrintListModalOpen] = useState(false)
  const [isPrintReceiptsModalOpen, setIsPrintReceiptsModalOpen] =
    useState(false)
  const [receiptToEdit, setReceiptToEdit] = useState(0)

  function handleCloseNewReceiptModal() {
    setIsNewReceiptModalOpen(false)
  }

  function handleCloseEditReceiptModal() {
    setIsEditReceiptModalOpen(false)
  }

  function handleClosePrintListModal() {
    setIsPrintListModalOpen(false)
  }

  function handleOpenNewReceiptModal() {
    setIsNewReceiptModalOpen(true)
  }

  function handleOpenPrintReceiptsModal() {
    setIsPrintReceiptsModalOpen(true)
  }

  function handleClosePrintReceiptsModal() {
    setIsPrintReceiptsModalOpen(false)
  }

  function handleOpenEditReceiptModal(id: number) {
    setReceiptToEdit(id)
    setIsEditReceiptModalOpen(true)
  }

  function handleOpenPrintListModal() {
    setIsPrintListModalOpen(true)
  }

  async function handleDeleteReceipt(id: number) {
    await api.delete(`/api/recibo/${id}`)
    if (search) {
      const { data } = await api.get<IReceiptsRequest>(
        `/api/recibo?nome=${search.toUpperCase()}`
      )
      setReceiptsLength(data.totalRecords)
      setReceipts(data.data)
    } else {
      const { data } = await api.get<IReceiptsRequest>(
        `/api/recibo?PageNumber=${currentPage}`
      )
      setReceiptsLength(data.totalRecords)
      setReceipts(data.data)
    }
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
          <SearchInput />
          <button type="button" onClick={handleOpenNewReceiptModal}>
            Adicionar Recibo
          </button>
          <button type="button" onClick={handleOpenPrintListModal}>
            Imprimir Listagem
          </button>
          <button type="button" onClick={handleOpenPrintReceiptsModal}>
            Imprimir Recibos
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
          <PrintListModal
            isOpen={isPrintListModalOpen}
            onRequestClose={handleClosePrintListModal}
          />
          <PrintReceiptsModal
            isOpen={isPrintReceiptsModalOpen}
            onRequestClose={handleClosePrintReceiptsModal}
          />
        </TableContainer>
      </DashboardContent>
    </DashboardContainer>
  )
}

export { Dashboard }
