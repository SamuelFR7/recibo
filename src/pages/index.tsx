import Head from 'next/head'
import React from 'react'
import { Dashboard } from '../components/Dashboard'

function Home() {
  return (
    <>
      <Head>
        <title>Recibos</title>
      </Head>
      <Dashboard />
    </>
  )
}

export default Home
