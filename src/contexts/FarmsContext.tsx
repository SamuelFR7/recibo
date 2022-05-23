import React, { createContext, ReactNode, useState } from 'react'
import { IFarm } from '../interfaces/IFarm'

interface IFarmsProviderProps {
  children: ReactNode
}

interface IFarmsContextData {
  farms: IFarm[]
  setFarms: React.Dispatch<React.SetStateAction<IFarm[]>>
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const FarmsContext = createContext<IFarmsContextData>(
  {} as IFarmsContextData
)

export function FarmsProvider({ children }: IFarmsProviderProps) {
  const [farms, setFarms] = useState<IFarm[]>([])
  const [search, setSearch] = useState('')

  return (
    <FarmsContext.Provider value={{ farms, setFarms, search, setSearch }}>
      {children}
    </FarmsContext.Provider>
  )
}
