import React from 'react'
import { ButtonsContainer, SidebarContainer, SidebarContent } from './styles'
import { ActiveLink } from '../ActiveLink'

import { IoReceiptOutline } from 'react-icons/io5'
import { GiGreenhouse } from 'react-icons/gi'

function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarContent>
        <h1>recibos</h1>

        <ButtonsContainer>
          <ActiveLink activeClassName="active" href="/">
            <button>
              <div>
                <IoReceiptOutline />
                <p>Recibos</p>
              </div>
            </button>
          </ActiveLink>
          <ActiveLink activeClassName="active" href="/fazendas">
            <button>
              <div>
                <GiGreenhouse />
                <p>Fazendas</p>
              </div>
            </button>
          </ActiveLink>
        </ButtonsContainer>
      </SidebarContent>
    </SidebarContainer>
  )
}

export { Sidebar }
