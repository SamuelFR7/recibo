import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  ButtonsContainer,
  SidebarContainer,
  SidebarContent,
  UserContainer,
} from './styles'
import { ActiveLink } from '../ActiveLink'

function Sidebar() {
  const [userImg, setUserImg] = useState('')

  useEffect(() => {
    async function getUserImg() {
      const { data } = await axios.get(
        'https://api.github.com/users/rezendemarcio'
      )
      setUserImg(data.avatar_url)
    }

    getUserImg()
  }, [])

  return (
    <SidebarContainer>
      <SidebarContent>
        <h1>recibos</h1>
        <UserContainer>
          <img src={userImg} />
          <p>Marcio Rezende</p>
        </UserContainer>
        <ButtonsContainer>
          <ActiveLink activeClassName="active" href="/">
            <button>Recibos</button>
          </ActiveLink>
          <ActiveLink activeClassName="active" href="/fazendas">
            <button>Fazendas</button>
          </ActiveLink>
        </ButtonsContainer>
      </SidebarContent>
    </SidebarContainer>
  )
}

export { Sidebar }