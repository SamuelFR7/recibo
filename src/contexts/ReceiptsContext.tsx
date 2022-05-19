import React, { createContext, ReactNode, useState } from 'react'
import { IReceipt } from '../interfaces/IReceipt'

interface IReceiptsProviderProps {
  children: ReactNode
}

interface IReceiptsContextData {
  receipts: IReceipt[]
  setReceipts: React.Dispatch<React.SetStateAction<IReceipt[]>>
}

export const ReceiptsContext = createContext<IReceiptsContextData>(
  {} as IReceiptsContextData
)

export function ReceiptsProvider({ children }: IReceiptsProviderProps) {
  const [receipts, setReceipts] = useState<IReceipt[]>([])

  return (
    <ReceiptsContext.Provider
      value={{
        receipts,
        setReceipts,
      }}
    >
      {children}
    </ReceiptsContext.Provider>
  )
}
