import React, { useEffect, useState } from 'react'
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

interface INewReceiptModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

function NewReceiptModal({ isOpen, onRequestClose }: INewReceiptModalProps) {
  const [todasFazendas, setTodasFazendas] = useState<IFarm[]>([])
  const [pagadorTipo, setPagadorTipo] = useState(0)
  const [beneficiarioTipo, setBeneficiarioTipo] = useState(0)
  const [Fazenda, setFazenda] = useState<number | null>()
  const [DataRecibo, setDataRecibo] = useState<Date | null>(new Date())
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
    setFazenda(0)
    setPagadorTipo(0)
    setBeneficiarioTipo(0)
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

  function handleSelectFarm(code: string) {
    const codigo = Number(code)
    setFazenda(codigo)
    const selectedFarm = todasFazendas.find(
      (element) => element.codigo === codigo
    )

    if (selectedFarm) {
      setPagadorNome(selectedFarm.nomePagador)
      setPagadorEndereco(selectedFarm.enderecoPagador)
      if (selectedFarm.documentoPagador) {
        if (selectedFarm.documentoPagador.length === 11) {
          setPagadorTipo(1)
        }

        setPagadorDocumento(selectedFarm.documentoPagador)
      }
    }
  }

  useEffect(() => {
    async function getFarmsData() {
      const response = await api.get<IFarm[]>('/api/farms')
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
        <AiOutlineClose />
      </button>
      <FormContainer onSubmit={handleAddReceipt}>
        <h2>Novo recibo</h2>
        <HighBox>
          <div>
            <p>Fazenda</p>
            <select
              onChange={(e) => handleSelectFarm(e.target.value)}
              required={true}
            >
              <option disabled selected>
                Selecionar
              </option>
              {todasFazendas?.map((farms) => {
                return (
                  <option value={farms.codigo} key={farms.codigo}>
                    {farms.nome}
                  </option>
                )
              })}
            </select>
          </div>
          <div>
            <p>Data</p>
            <input
              placeholder="Data"
              value={DataRecibo?.toString()}
              type="date"
              onChange={(e) => setDataRecibo(e.target.valueAsDate)}
              required={true}
            />
          </div>
          <div>
            <p>Valor</p>
            <input
              placeholder="Valor"
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
                value={BeneficiarioNome}
                onChange={(e) => setBeneficiarioNome(e.target.value)}
                required={true}
              />
            </NameBox>
            <InfosBox>
              <div>
                <p>Endereco</p>
                <input
                  value={BeneficiarioEndereco}
                  className="endereco"
                  onChange={(e) => setBeneficiarioEndereco(e.target.value)}
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
                  >
                    <option selected value={0}>
                      CNPJ
                    </option>
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
                value={PagadorNome}
                onChange={(e) => setPagadorNome(e.target.value)}
                required={true}
              />
            </NameBox>
            <InfosBox>
              <div>
                <p>Endereco</p>
                <input
                  value={PagadorEndereco}
                  className="endereco"
                  onChange={(e) => setPagadorEndereco(e.target.value)}
                  required={true}
                />
              </div>
              <DocumentBox>
                <div>
                  <p>Tipo</p>
                  <select
                    onChange={(e) => setPagadorTipo(Number(e.target.value))}
                  >
                    <option selected={pagadorTipo === 0} value={0}>
                      CNPJ
                    </option>
                    <option selected={pagadorTipo === 1} value={1}>
                      CPF
                    </option>
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
              value={Historico}
              onChange={(e) => setHistorico(e.target.value)}
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

export { NewReceiptModal }
