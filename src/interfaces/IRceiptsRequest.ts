import { IReceipt } from './IReceipt'

export interface IReceiptsRequest {
  pageNumber: number
  pageSize: number
  firstPage: string
  lastPage: string
  totalPages: number
  totalRecords: 5
  nextPage: null
  previousPage: null
  data: IReceipt[]
}
