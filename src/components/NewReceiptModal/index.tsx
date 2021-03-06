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
import { IReceiptsRequest } from '../../interfaces/IRceiptsRequest'

interface INewReceiptModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

function NewReceiptModal({ isOpen, onRequestClose }: INewReceiptModalProps) {
  const { setReceipts, currentPage, setReceiptsLength, search } = useReceipts()
  const [todasFazendas, setTodasFazendas] = useState<IFarm[]>([])
  const [pagadorTipo, setPagadorTipo] = useState(0)
  const [beneficiarioTipo, setBeneficiarioTipo] = useState(0)
  const [Fazenda, setFazenda] = useState<number | null>()
  const [DataRecibo, setDataRecibo] = useState<Date>(new Date())
  const [Valor, setValor] = useState(0)
  const [Historico, setHistorico] = useState('')
  const [BeneficiarioNome, setBeneficiarioNome] = useState('')
  const [BeneficiarioEndereco, setBeneficiarioEndereco] = useState('')
  const [BeneficiarioDocumento, setBeneficiarioDocumento] = useState('')
  const [PagadorNome, setPagadorNome] = useState('')
  const [PagadorEndereco, setPagadorEndereco] = useState('')
  const [PagadorDocumento, setPagadorDocumento] = useState('')

  async function handleAddReceipt(e: FormEvent) {
    e.preventDefault()
    await api.post('/api/recibo', {
      Id: '0',
      fazenda: {
        Id: Fazenda,
        Nome: '.',
        PagadorNome: '',
        PagadorEndereco: '',
        PagadorDocumento: '',
      },
      Numero: '0',
      Data: DataRecibo,
      Valor,
      Historico,
      BeneficiarioNome,
      BeneficiarioEndereco,
      BeneficiarioDocumento: BeneficiarioDocumento.replace(/[^0-9]/g, ''),
      PagadorNome,
      PagadorEndereco,
      PagadorDocumento: PagadorDocumento.replace(/[^0-9]/g, ''),
    })
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
    handleResetReceipt()
  }

  function handleResetReceiptAndClose() {
    setFazenda(0)
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

  function handleResetReceipt() {
    setPagadorTipo(0)
    setBeneficiarioTipo(0)
    setValor(0)
    setHistorico('')
    setBeneficiarioNome('')
    setBeneficiarioEndereco('')
    setBeneficiarioDocumento('')
  }

  function handleSelectFarm(code: string) {
    const codigo = Number(code)
    setFazenda(codigo)
    const selectedFarm = todasFazendas.find((element) => element.id === codigo)

    if (selectedFarm) {
      if (selectedFarm.pagadorNome) {
        setPagadorNome(selectedFarm.pagadorNome)
      } else {
        setPagadorNome('')
      }
      if (selectedFarm.pagadorEndereco) {
        setPagadorEndereco(selectedFarm.pagadorEndereco)
      } else {
        setPagadorEndereco('')
      }
      if (selectedFarm.pagadorDocumento) {
        if (selectedFarm.pagadorDocumento.length === 11) {
          setPagadorTipo(1)
        }

        setPagadorDocumento(selectedFarm.pagadorDocumento)
      }
    }
  }

  useEffect(() => {
    async function getFarmsData() {
      const response = await api.get<IFarm[]>('/api/fazenda')
      setTodasFazendas(response.data)
    }

    getFarmsData()
  }, [])

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
        <AiOutlineClose size={32} />
      </button>
      <FormContainer onSubmit={(e) => handleAddReceipt(e)}>
        <h2>Novo recibo</h2>
        <HighBox>
          <div>
            <p>Fazenda</p>
            <select
              onChange={(e) => handleSelectFarm(e.target.value)}
              required={true}
              defaultValue={-1}
            >
              <option disabled value={-1}>
                Selecionar
              </option>
              {todasFazendas?.map((farms) => {
                return (
                  <option value={farms.id} key={farms.id}>
                    {farms.nome}
                  </option>
                )
              })}
            </select>
          </div>
          <div>
            <p>Data</p>
            <input
              type="date"
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
          <p>Benefici??rio</p>
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
                  value={BeneficiarioEndereco.toUpperCase()}
                  className="endereco"
                  onChange={(e) =>
                    setBeneficiarioEndereco(e.target.value.toUpperCase())
                  }
                />
              </div>
              <DocumentBox>
                <div>
                  <p>Tipo</p>
                  <select
                    onChange={(e) =>
                      setBeneficiarioTipo(Number(e.target.value))
                    }
                    defaultValue={0}
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
          <p>Hist??rico</p>
          <div>
            <textarea
              value={Historico.toUpperCase()}
              onChange={(e) => setHistorico(e.target.value.toUpperCase())}
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

export { NewReceiptModal }
