import React from 'react'
import type { AppProps } from 'next/app'

import { GlobalStyle, Container } from '../styles/Global'
import { Sidebar } from '../components/Sidebar'
import { ReceiptsProvider } from '../contexts/ReceiptsContext'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ReceiptsProvider>
        <Container>
          <Sidebar />
          <Component {...pageProps} />
        </Container>
      </ReceiptsProvider>
      <GlobalStyle />
    </>
  )
}

export default MyApp
