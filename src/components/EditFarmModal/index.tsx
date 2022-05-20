import React, { FormEvent, useEffect, useState } from 'react'
import Modal from 'react-modal'

import { AiOutlineClose } from 'react-icons/ai'
import {
  DocumentBox,
  FarmFormContainer,
  HighBox,
  InfosBox,
  InputsBox,
  NameBox,
  NameInputBox,
  RecipientBox,
} from './styles'

import InputMask from 'react-input-mask'
import api from '../../services/api'
import { useFarms } from '../../hooks/useFarms'
import { IFarm } from '../../interfaces/IFarm'

interface IEditFarmModalProps {
  isOpen: boolean
  onRequestClose: () => void
  farmToEdit: number
  setFarmToEdit: React.Dispatch<React.SetStateAction<number>>
}

function EditFarmModal({
  isOpen,
  onRequestClose,
  farmToEdit,
  setFarmToEdit,
}: IEditFarmModalProps) {
  const { setFarms } = useFarms()
  const [Nome, setNome] = useState('')
  const [pagadorNome, setPagadorNome] = useState('')
  const [pagadorEndereco, setPagadorEndereco] = useState('')
  const [pagadorDocumento, setPagadorDocumento] = useState('')
  const [pagadorTipo, setPagadorTipo] = useState(0)

  async function handleEditFarm(e: FormEvent) {
    e.preventDefault()
    await api.put('/api/fazenda', {
      id: farmToEdit,
      Nome,
      pagadorNome,
      pagadorEndereco,
      pagadorDocumento: pagadorDocumento.replace(/[^0-9]/g, ''),
    })
    const response = await api.get<IFarm[]>('/api/fazenda')
    setFarms(response.data)
    handleResetFarmAndClose()
  }

  function handleResetFarmAndClose() {
    setFarmToEdit(0)
    setNome('')
    setPagadorNome('')
    setPagadorEndereco('')
    setPagadorDocumento('')
    setPagadorTipo(0)
    onRequestClose()
  }

  useEffect(() => {
    async function getFarmToEdit() {
      if (farmToEdit) {
        const { data } = await api.get<IFarm>(`/api/fazenda/${farmToEdit}`)
        setNome(data.nome)
        setPagadorNome(data.pagadorNome)
        setPagadorEndereco(data.pagadorEndereco)
        setPagadorDocumento(data.pagadorDocumento)
        setPagadorTipo(data.pagadorDocumento.length === 11 ? 1 : 0)
      }
    }

    getFarmToEdit()
  }, [farmToEdit])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleResetFarmAndClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button className="react-modal-close" onClick={handleResetFarmAndClose}>
        <AiOutlineClose size={32} />
      </button>
      <FarmFormContainer onSubmit={(e) => handleEditFarm(e)}>
        <h2>Nova Fazenda</h2>
        <HighBox>
          <div>
            <p>Nome Fazenda</p>
            <NameInputBox>
              <input
                value={Nome}
                onChange={(e) => setNome(e.target.value)}
                required={true}
              />
            </NameInputBox>
          </div>
        </HighBox>
        <RecipientBox>
          <p>Pagador</p>
          <InputsBox>
            <NameBox>
              <p>Nome</p>
              <input
                value={pagadorNome.toUpperCase()}
                onChange={(e) => setPagadorNome(e.target.value.toUpperCase())}
                required={true}
              />
            </NameBox>
            <InfosBox>
              <div>
                <p>Endereço</p>
                <input
                  value={pagadorEndereco.toUpperCase()}
                  className="endereco"
                  onChange={(e) =>
                    setPagadorEndereco(e.target.value.toUpperCase())
                  }
                />
              </div>
              <DocumentBox>
                <div>
                  <p>Tipo</p>
                  <select
                    onChange={(e) => setPagadorTipo(Number(e.target.value))}
                    value={pagadorTipo}
                  >
                    <option value={0}>CNPJ</option>
                    <option value={1}>CPF</option>
                  </select>
                </div>
                <div className="documento">
                  <p>{pagadorTipo === 0 ? 'CNPJ' : 'CPF'}</p>
                  <InputMask
                    mask={
                      pagadorTipo === 0
                        ? '99.999.999/9999-99'
                        : '999.999.999-99'
                    }
                    alwaysShowMask={true}
                    value={pagadorDocumento}
                    onChange={(e) => setPagadorDocumento(e.target.value)}
                  />
                </div>
              </DocumentBox>
            </InfosBox>
          </InputsBox>
        </RecipientBox>
        <button type="submit">Salvar</button>
      </FarmFormContainer>
    </Modal>
  )
}

export { EditFarmModal }