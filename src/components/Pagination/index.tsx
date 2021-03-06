import Pagination from 'rc-pagination'
import React, { useEffect } from 'react'

import { Container } from './styles'

import 'rc-pagination/assets/index.css'
import { useReceipts } from '../../hooks/useReceipts'
import api from '../../services/api'
import { IReceiptsRequest } from '../../interfaces/IRceiptsRequest'

export function PaginationContainer() {
  const { currentPage, setCurrentPage, receiptsLength, setReceiptsLength } =
    useReceipts()

  useEffect(() => {
    async function getPageLength() {
      const { data } = await api.get<IReceiptsRequest>(
        `/api/recibo?PageNumber=1`
      )
      setReceiptsLength(data.totalRecords)
    }
    getPageLength()
  }, [])

  return (
    <Container>
      <Pagination
        pageSize={10}
        current={currentPage}
        total={receiptsLength}
        onChange={setCurrentPage}
      />
    </Container>
  )
}
