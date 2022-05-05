import React from 'react'
import type { AppProps } from 'next/app'

import { GlobalStyle } from '../styles/Global'
import { Sidebar } from '../components/Sidebar'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Sidebar />
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  )
}

export default MyApp
