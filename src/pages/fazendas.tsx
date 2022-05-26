import Head from 'next/head'
import React from 'react'
import { FarmDashboard } from '../components/FarmDashboard'

function Fazendas() {
  return (
    <>
      <Head>
        <title>Fazendas</title>
      </Head>
      <FarmDashboard />
    </>
  )
}

export default Fazendas
