import React from 'react'
import { useReceipts } from '../../hooks/useReceipts'
import { IReceiptsRequest } from '../../interfaces/IRceiptsRequest'
import api from '../../services/api'

function SearchInput() {
  const { setReceipts, setSearch, currentPage } = useReceipts()

  async function handleChange(value: string) {
    setSearch(value)
    if (value) {
      const { data } = await api.get<IReceiptsRequest>(
        `/api/recibo?nome=${value.toUpperCase()}`
      )
      setReceipts(data.data)
    } else {
      const { data } = await api.get<IReceiptsRequest>(
        `/api/recibo?PageNumber=${currentPage}`
      )
      setReceipts(data.data)
    }
  }

  return (
    <input
      placeholder="Pesquisar Beneficiário"
      type="search"
      onChange={(e) => handleChange(e.target.value)}
    />
  )
}

export { SearchInput }
