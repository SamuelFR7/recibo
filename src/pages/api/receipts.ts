import { NextApiRequest, NextApiResponse } from 'next'

export default function Receipt(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.json([
    {
      codigo: '1',
      fazenda: 'Alvorada',
      numero: 1,
      data: new Date().toString(),
      valor: 1000,
      historico: '02',
      beneficiarioNome: 'exemplo',
      beneficiarioEndereco: 'exemplo',
      beneficiarioDocumento: '00000000000',
      pagadorNome: 'exemplo',
      pagadorEndereco: 'exemplo',
      pagadorDocumento: '9999999999',
    },
  ])
}
