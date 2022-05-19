import React, { FormEvent, useEffect, useState } from 'react'
import Modal from 'react-modal'

import { AiOutlineClose } from 'react-icons/ai'
import {
  DocumentBox,
  FormContainer,
  HighBox,
  HistoricBox,
  InfosBox,
  InputsBox,
  NameBox,
  RecipientBox,
  SubmitBox,
} from './styles'

import InputMask from 'react-input-mask'

import api from '../../services/api'
import { IFarm } from '../../interfaces/IFarm'
import { useReceipts } from '../../hooks/useReceipts'
import { IReceipt } from '../../interfaces/IReceipt'

interface IEditReceiptModalProps {
  isOpen: boolean
  onRequestClose: () => void
  receiptToEdit: number
  setReceiptToEdit: React.Dispatch<React.SetStateAction<number>>
}

function EditReceiptModal({
  isOpen,
  onRequestClose,
  receiptToEdit,
  setReceiptToEdit,
}: IEditReceiptModalProps) {
  const { setReceipts } = useReceipts()
  const [pagadorTipo, setPagadorTipo] = useState(0)
  const [beneficiarioTipo, setBeneficiarioTipo] = useState(0)
  const [Fazenda, setFazenda] = useState<IFarm>()
  const [DataRecibo, setDataRecibo] = useState<Date>(new Date())
  const [Numero, setNumero] = useState(0)
  const [Valor, setValor] = useState(0)
  const [Historico, setHistorico] = useState('')
  const [BeneficiarioNome, setBeneficiarioNome] = useState('')
  const [BeneficiarioEndereco, setBeneficiarioEndereco] = useState('')
  const [BeneficiarioDocumento, setBeneficiarioDocumento] = useState('')
  const [PagadorNome, setPagadorNome] = useState('')
  const [PagadorEndereco, setPagadorEndereco] = useState('')
  const [PagadorDocumento, setPagadorDocumento] = useState('')

  async function handleEditReceipt(e: FormEvent) {
    e.preventDefault()
    await api.put('/api/recibo', {
      Id: receiptToEdit,
      Data: DataRecibo,
      Fazenda,
      Valor,
      Numero,
      Historico,
      BeneficiarioNome,
      BeneficiarioEndereco,
      BeneficiarioDocumento: BeneficiarioDocumento.replace(/[^0-9]/g, ''),
      PagadorNome,
      PagadorEndereco,
      PagadorDocumento: PagadorDocumento.replace(/[^0-9]/g, ''),
    })
    const response = await api.get<IReceipt[]>('/api/recibo')
    setReceipts(response.data)
    handleResetReceiptAndClose()
  }

  function handleResetReceiptAndClose() {
    setReceiptToEdit(0)
    setPagadorTipo(0)
    setBeneficiarioTipo(0)
    setDataRecibo(new Date())
    setValor(0)
    setHistorico('')
    setBeneficiarioNome('')
    setBeneficiarioEndereco('')
    setBeneficiarioDocumento('')
    setPagadorNome('')
    setPagadorEndereco('')
    setPagadorDocumento('')
    onRequestClose()
  }

  useEffect(() => {
    async function getReceiptToEdit() {
      if (receiptToEdit) {
        const { data } = await api.get<IReceipt>(`/api/recibo/${receiptToEdit}`)
        setFazenda(data.fazenda)
        setDataRecibo(data.data)
        setValor(data.valor)
        setBeneficiarioNome(data.beneficiarioNome)
        setBeneficiarioEndereco(data.beneficiarioEndereco)
        setBeneficiarioDocumento(data.beneficiarioDocumento)
        setBeneficiarioTipo(data.beneficiarioDocumento.length === 11 ? 1 : 0)
        setPagadorNome(data.pagadorNome)
        setPagadorEndereco(data.pagadorEndereco)
        setPagadorDocumento(data.pagadorDocumento)
        setPagadorTipo(data.pagadorDocumento.length === 11 ? 1 : 0)
        setHistorico(data.historico)
        setNumero(data.numero)
      }
    }

    getReceiptToEdit()
  }, [receiptToEdit])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleResetReceiptAndClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <button
        className="react-modal-close"
        onClick={handleResetReceiptAndClose}
      >
        <AiOutlineClose />
      </button>
      <FormContainer onSubmit={(e) => handleEditReceipt(e)}>
        <h2>Editar recibo</h2>
        <HighBox>
          <div>
            <p>Fazenda</p>
            <input disabled={true} value={Fazenda?.nome}></input>
          </div>
          <div>
            <p>Data</p>
            <input
              type="date"
              value={new Date(DataRecibo).toISOString().split('T')[0]}
              onChange={(e) =>
                setDataRecibo(
                  e.target.valueAsDate != null
                    ? e.target.valueAsDate
                    : new Date()
                )
              }
              required={true}
            />
          </div>
          <div>
            <p>Valor</p>
            <input
              className="valor"
              type="number"
              value={Valor}
              onChange={(e) => setValor(e.target.valueAsNumber)}
              required={true}
            />
          </div>
        </HighBox>
        <RecipientBox>
          <p>Beneficiário</p>
          <InputsBox>
            <NameBox>
              <p>Nome</p>
              <input
                value={BeneficiarioNome.toUpperCase()}
                onChange={(e) =>
                  setBeneficiarioNome(e.target.value.toUpperCase())
                }
                required={true}
              />
            </NameBox>
            <InfosBox>
              <div>
                <p>Endereco</p>
                <input
                  value={BeneficiarioEndereco?.toUpperCase()}
                  className="endereco"
                  onChange={(e) =>
                    setBeneficiarioEndereco(e.target.value.toUpperCase())
                  }
                  required={true}
                />
              </div>
              <DocumentBox>
                <div>
                  <p>Tipo</p>
                  <select
                    onChange={(e) =>
                      setBeneficiarioTipo(Number(e.target.value))
                    }
                    value={beneficiarioTipo}
                  >
                    <option value={0}>CNPJ</option>
                    <option value={1}>CPF</option>
                  </select>
                </div>
                <div className="documento">
                  <p>{beneficiarioTipo === 0 ? 'CNPJ' : 'CPF'}</p>
                  <InputMask
                    mask={
                      beneficiarioTipo === 0
                        ? '99.999.999/9999-99'
                        : '999.999.999-99'
                    }
                    alwaysShowMask={true}
                    value={BeneficiarioDocumento}
                    onChange={(e) => setBeneficiarioDocumento(e.target.value)}
                  />
                </div>
              </DocumentBox>
            </InfosBox>
          </InputsBox>
        </RecipientBox>
        <RecipientBox>
          <p>Pagador</p>
          <InputsBox>
            <NameBox>
              <p>Nome</p>
              <input
                value={PagadorNome.toUpperCase()}
                onChange={(e) => setPagadorNome(e.target.value.toUpperCase())}
                required={true}
              />
            </NameBox>
            <InfosBox>
              <div>
                <p>Endereco</p>
                <input
                  value={PagadorEndereco.toUpperCase()}
                  className="endereco"
                  onChange={(e) =>
                    setPagadorEndereco(e.target.value.toUpperCase())
                  }
                  required={true}
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
                  <p>{pagadorTipo === 0 ? 'CPNJ' : 'CPF'}</p>
                  <InputMask
                    mask={
                      pagadorTipo === 0
                        ? '99.999.999/9999-99'
                        : '999.999.999-99'
                    }
                    alwaysShowMask={true}
                    value={PagadorDocumento}
                    onChange={(e) => setPagadorDocumento(e.target.value)}
                  />
                </div>
              </DocumentBox>
            </InfosBox>
          </InputsBox>
        </RecipientBox>
        <HistoricBox>
          <p>Histórico</p>
          <div>
            <textarea
              value={Historico.toUpperCase()}
              onChange={(e) => setHistorico(e.target.value.toUpperCase())}
              required={true}
            />
          </div>
        </HistoricBox>
        <SubmitBox>
          <button type="submit">Salvar</button>
        </SubmitBox>
      </FormContainer>
    </Modal>
  )
}

export { EditReceiptModal }
