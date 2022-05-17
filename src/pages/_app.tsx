import React from 'react'
import type { AppProps } from 'next/app'

import { GlobalStyle, Container } from '../styles/Global'
import { Sidebar } from '../components/Sidebar'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Container>
        <Sidebar />
        <Component {...pageProps} />
      </Container>
      <GlobalStyle />
    </>
  )
}

export default MyApp
