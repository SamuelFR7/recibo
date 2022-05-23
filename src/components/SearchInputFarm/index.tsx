import React from 'react'
import { useFarms } from '../../hooks/useFarms'
import { IFarm } from '../../interfaces/IFarm'
import api from '../../services/api'

function SearchInputFarm() {
  const { setSearch, setFarms } = useFarms()

  async function handleChange(value: string) {
    setSearch(value)
    if (value) {
      const { data } = await api.get<IFarm[]>(
        `/api/fazenda?nome=${value.toUpperCase()}`
      )
      setFarms(data)
    } else {
      const { data } = await api.get<IFarm[]>(`/api/fazenda`)
      setFarms(data)
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

export { SearchInputFarm }
