import React, { useState } from 'react'
import Modal from 'react-modal'

import { AiOutlineClose } from 'react-icons/ai'
import { FarmFormContainer } from './styles'

interface INewFarmModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

function NewFarmModal({ isOpen, onRequestClose }: INewFarmModalProps) {
  const [Nome, setNome] = useState('')

  function handleAddFarm() {}

  function handleResetFarmAndClose() {
    setNome('')
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleResetFarmAndClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button className="react-modal-close" onClick={handleResetFarmAndClose}>
        <AiOutlineClose />
      </button>
      <FarmFormContainer onSubmit={handleAddFarm}>
        <h2>Adicionar Fazenda</h2>
        <input
          placeholder="Nome"
          value={Nome}
          onChange={(e) => setNome(e.target.value)}
          required={true}
        />
        <button type="submit">Adicionar</button>
      </FarmFormContainer>
    </Modal>
  )
}

export { NewFarmModal }
