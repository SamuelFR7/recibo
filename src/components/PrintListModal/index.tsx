import React, { FormEvent, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Modal from 'react-modal'
import { IFarm } from '../../interfaces/IFarm'
import api from '../../services/api'
import { FormContainer, HighBox } from './styles'

interface IPrintListModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

function PrintListModal({ isOpen, onRequestClose }: IPrintListModalProps) {
  const [allFarms, setAllFarms] = useState<IFarm[]>([])
  const [farmToPrint, setFarmToPrint] = useState(0)

  function handleResetFarmToPrintAndClose() {
    setFarmToPrint(0)
    onRequestClose()
  }

  async function handlePrintFarm(e: FormEvent) {
    e.preventDefault()
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL_API}/api/relatoriolistagem?FazendaId=${farmToPrint}`
    )
  }

  useEffect(() => {
    async function getAllFarms() {
      const response = await api.get<IFarm[]>('/api/fazenda')
      setAllFarms(response.data)
    }

    getAllFarms()
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleResetFarmToPrintAndClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <button
        className="react-modal-close"
        onClick={handleResetFarmToPrintAndClose}
      >
        <AiOutlineClose size={32} />
      </button>
      <FormContainer onSubmit={(e) => handlePrintFarm(e)}>
        <h2>Imprimir Listagem</h2>
        <HighBox>
          <p>Fazenda</p>
          <select onChange={(e) => setFarmToPrint(Number(e.target.value))}>
            <option value={0}>Todas</option>
            {allFarms.map((item) => (
              <option key={item.id} value={item.id}>
                {' '}
                {item.nome}
              </option>
            ))}
          </select>
        </HighBox>
        <button type="submit">Imprimir</button>
      </FormContainer>
    </Modal>
  )
}

export { PrintListModal }
