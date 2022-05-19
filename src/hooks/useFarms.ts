import { useContext } from 'react'
import { FarmsContext } from '../contexts/FarmsContext'

export function useFarms() {
  const context = useContext(FarmsContext)

  return context
}
