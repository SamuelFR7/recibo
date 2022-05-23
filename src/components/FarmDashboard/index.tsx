import React, { useEffect, useState } from 'react'
import { BiPencil, BiTrash } from 'react-icons/bi'
import ReactTooltip from 'react-tooltip'
import { useFarms } from '../../hooks/useFarms'
import { IFarm } from '../../interfaces/IFarm'
import api from '../../services/api'
import { EditFarmModal } from '../EditFarmModal'
import { NewFarmModal } from '../NewFarmModal'
import { SearchInputFarm } from '../SearchInputFarm'
import {
  FarmButtonsBox,
  FarmDashboardContainer,
  FarmDashboardContent,
  FarmTableContainer,
  ImgButton,
} from './styles'

function FarmDashboard() {
  const { farms, setFarms, search } = useFarms()
  const [isNewFarmModalOpen, setIsNewFarmModalOpen] = useState(false)
  const [isEditFarmModalOpen, setIsEditFarmModalOpen] = useState(false)
  const [farmToEdit, setFarmToEdit] = useState(0)

  function handleOpenNewFarmModal() {
    setIsNewFarmModalOpen(true)
  }

  function handleCloseNewFarmModal() {
    setIsNewFarmModalOpen(false)
  }

  function handleOpenEditFarmModal(id: number) {
    setFarmToEdit(id)
    setIsEditFarmModalOpen(true)
  }

  function handleCloseEditFarmModal() {
    setIsEditFarmModalOpen(false)
  }

  async function handleDeleteFarm(id: number) {
    await api.delete(`/api/fazenda/${id}`)
    if (search) {
      const { data } = await api.get<IFarm[]>(
        `/api/fazenda?nome=${search.toUpperCase()}`
      )
      setFarms(data)
    } else {
      const { data } = await api.get<IFarm[]>(`/api/fazenda`)
      setFarms(data)
    }
  }

  useEffect(() => {
    async function getFarmsData() {
      const response = await api.get<IFarm[]>('/api/fazenda')
      setFarms(response.data)
    }

    getFarmsData()
  }, [])

  return (
    <FarmDashboardContainer>
      <FarmDashboardContent>
        <FarmButtonsBox>
          <SearchInputFarm />
          <button type="button" onClick={handleOpenNewFarmModal}>
            Adicionar Fazenda
          </button>
        </FarmButtonsBox>
        <FarmTableContainer>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Nome Pagador</th>
                <th>Endereço Pagador</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {farms.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.pagadorNome}</td>
                  <td>{item.pagadorEndereco}</td>
                  <td>
                    <ReactTooltip effect="solid" />
                    <ImgButton
                      data-tip="Editar"
                      onClick={() => handleOpenEditFarmModal(item.id)}
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
                          handleDeleteFarm(item.id)
                      }}
                    >
                      <BiTrash size={32} />
                    </ImgButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <NewFarmModal
            isOpen={isNewFarmModalOpen}
            onRequestClose={handleCloseNewFarmModal}
          />
          <EditFarmModal
            isOpen={isEditFarmModalOpen}
            onRequestClose={handleCloseEditFarmModal}
            farmToEdit={farmToEdit}
            setFarmToEdit={setFarmToEdit}
          />
        </FarmTableContainer>
      </FarmDashboardContent>
    </FarmDashboardContainer>
  )
}

export { FarmDashboard }
