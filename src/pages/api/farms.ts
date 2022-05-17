import type { NextApiRequest, NextApiResponse } from 'next'

function farms(request: NextApiRequest, response: NextApiResponse) {
  response.json({
    Fazendas: {
      id: '1',
      nome: 'Fazenda',
    },
  })
}

export default farms
