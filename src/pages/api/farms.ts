import { NextApiRequest, NextApiResponse } from 'next'

export default function Receipt(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.json([
    {
      codigo: '1',
      nome: 'Alvorada',
    },
  ])
}