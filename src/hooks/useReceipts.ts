import { useContext } from 'react'
import { ReceiptsContext } from '../contexts/ReceiptsContext'

export function useReceipts() {
  const context = useContext(ReceiptsContext)

  return context
}
