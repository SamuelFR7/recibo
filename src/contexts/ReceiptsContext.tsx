import React, { createContext, ReactNode, useState } from 'react'
import { IReceipt } from '../interfaces/IReceipt'

interface IReceiptsProviderProps {
  children: ReactNode
}

interface IReceiptsContextData {
  receipts: IReceipt[]
  setReceipts: React.Dispatch<React.SetStateAction<IReceipt[]>>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export const ReceiptsContext = createContext<IReceiptsContextData>(
  {} as IReceiptsContextData
)

export function ReceiptsProvider({ children }: IReceiptsProviderProps) {
  const [receipts, setReceipts] = useState<IReceipt[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <ReceiptsContext.Provider
      value={{
        receipts,
        setReceipts,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </ReceiptsContext.Provider>
  )
}
