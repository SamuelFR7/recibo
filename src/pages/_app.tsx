import React from 'react'
import type { AppProps } from 'next/app'

import { GlobalStyle, Container } from '../styles/Global'
import { Sidebar } from '../components/Sidebar'
import { ReceiptsProvider } from '../contexts/ReceiptsContext'
import { FarmsProvider } from '../contexts/FarmsContext'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <FarmsProvider>
        <ReceiptsProvider>
          <Container>
            <Sidebar />
            <Component {...pageProps} />
          </Container>
        </ReceiptsProvider>
      </FarmsProvider>
      <GlobalStyle />
    </>
  )
}

export default MyApp
