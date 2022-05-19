import React, { createContext, ReactNode, useState } from 'react'
import { IFarm } from '../interfaces/IFarm'

interface IFarmsProviderProps {
  children: ReactNode
}

interface IFarmsContextData {
  farms: IFarm[]
  setFarms: React.Dispatch<React.SetStateAction<IFarm[]>>
}

export const FarmsContext = createContext<IFarmsContextData>(
  {} as IFarmsContextData
)

export function FarmsProvider({ children }: IFarmsProviderProps) {
  const [farms, setFarms] = useState<IFarm[]>([])

  return (
    <FarmsContext.Provider value={{ farms, setFarms }}>
      {children}
    </FarmsContext.Provider>
  )
}
