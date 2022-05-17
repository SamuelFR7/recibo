import React from 'react'
import {
  ButtonsBox,
  DashboardContainer,
  DashboardContent,
  TableContainer,
} from './styles'

import { BiExport } from 'react-icons/bi'

function Dashboard() {
  return (
    <DashboardContainer>
      <DashboardContent>
        <ButtonsBox>
          <input placeholder="Pesquisar" type="search" />
          <button type="button">Adicionar Recibo</button>
        </ButtonsBox>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Fazenda</th>
                <th>Numero</th>
                <th>Valor</th>
                <th>Extrato</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Fazenda 1</td>
                <td>1</td>
                <td>1000,00</td>
                <td>
                  <div className="imgButton">
                    <BiExport />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
      </DashboardContent>
    </DashboardContainer>
  )
}

export { Dashboard }
