import React, { useState } from 'react'
import Modal from 'react-modal'

import { AiOutlineClose } from 'react-icons/ai'
import { FormContainer } from './styles'

interface INewReceiptModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

function NewReceiptModal({ isOpen, onRequestClose }: INewReceiptModalProps) {
  const [Fazenda, setFazenda] = useState('')
  const [Numero, setNumero] = useState(0)
  const [DataRecibo, setDataRecibo] = useState<Date>(new Date())
  const [Valor, setValor] = useState(0.0)
  const [Historico, setHistorico] = useState('')
  const [BeneficiarioNome, setBeneficiarioNome] = useState('')
  const [BeneficiarioEndereco, setBeneficiarioEndereco] = useState('')
  const [BeneficiarioDocumento, setBeneficiarioDocumento] = useState('')
  const [PagadorNome, setPagadorNome] = useState('')
  const [PagadorEndereco, setPagadorEndereco] = useState('')
  const [PagadorDocumento, setPagadorDocumento] = useState('')

  function handleAddReceipt() {}

  function handleResetReceiptAndClose() {
    setFazenda('')
    setNumero(0)
    setDataRecibo(new Date())
    setValor(0.0)
    setHistorico('')
    setBeneficiarioNome('')
    setBeneficiarioEndereco('')
    setBeneficiarioDocumento('')
    setPagadorNome('')
    setPagadorEndereco('')
    setPagadorDocumento('')
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleResetReceiptAndClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        className="react-modal-close"
        onClick={handleResetReceiptAndClose}
      >
        <AiOutlineClose />
      </button>
      <FormContainer onSubmit={handleAddReceipt}>
        <h2>Adicionar Recibo</h2>
        <input
          placeholder="Fazenda"
          value={Fazenda}
          onChange={(e) => setFazenda(e.target.value)}
          required={true}
        />
        <input
          placeholder="Numero"
          type="number"
          value={Numero}
          onChange={(e) => setNumero(e.target.valueAsNumber)}
          required={true}
        />
        <input
          placeholder="Data"
          value={DataRecibo.toString()}
          type="date"
          onChange={(e) => setDataRecibo(e.target.valueAsDate)}
          required={true}
        />
        <input
          placeholder="Valor"
          type="number"
          value={Valor}
          onChange={(e) => setValor(e.target.valueAsNumber)}
          required={true}
        />
        <input
          placeholder="Historico"
          value={Historico}
          onChange={(e) => setHistorico(e.target.value)}
          required={true}
        />
        <input
          placeholder="Nome Beneficiario"
          value={BeneficiarioNome}
          onChange={(e) => setBeneficiarioNome(e.target.value)}
          required={true}
        />
        <input
          placeholder="Endereço Beneficiario"
          value={BeneficiarioEndereco}
          onChange={(e) => setBeneficiarioEndereco(e.target.value)}
          required={true}
        />
        <input
          placeholder="Documento Beneficiario"
          value={BeneficiarioDocumento}
          onChange={(e) => setBeneficiarioDocumento(e.target.value)}
          required={true}
        />
        <input
          placeholder="Nome Pagador"
          value={PagadorNome}
          onChange={(e) => setPagadorNome(e.target.value)}
          required={true}
        />
        <input
          placeholder="Endereço Pagador"
          value={PagadorEndereco}
          onChange={(e) => setPagadorEndereco(e.target.value)}
          required={true}
        />
        <input
          placeholder="Documento Pagador"
          value={PagadorDocumento}
          onChange={(e) => setPagadorDocumento(e.target.value)}
          required={true}
        />
        <button type="submit">Adicionar</button>
      </FormContainer>
    </Modal>
  )
}

export { NewReceiptModal }
