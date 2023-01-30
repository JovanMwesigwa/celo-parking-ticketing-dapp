import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useMoralis, useWeb3Contract } from 'react-moralis'

import { ABI, ADMIN_ADDRESS, CONTRACT_ADDRESS } from '../constants'
import { ethers } from 'ethers'

const AllTickets = dynamic(() => import('./components/cards/AllTickets'))
const CreateTicket = dynamic(() => import('./components/cards/CreateTicket'))
const TicketDetail = dynamic(() => import('./components/cards/TicketDetail'))
const MainLayout = dynamic(() => import('./components/MainLayout'))

export default function Home() {
  const [tickets, setTickets] = useState([])
  const { isWeb3Enabled, Moralis, account } = useMoralis()
  const [adminAddress, setAdminAddress] = useState(
    '0x5cbdf5f9e468df3888e04155668ccafc6f6c4dcf'
  )

  const [selectedTicket, setSelectedTicket] = useState(null)

  useEffect(() => {
    if (isWeb3Enabled) {
      populateData()
    }
  }, [isWeb3Enabled, account, tickets])

  const populateData = async () => {
    try {
      const returnedTixs = await getAllTickets()
      setTickets(returnedTixs)
    } catch (error) {
      console.log(error.response)
    }
  }

  const { runContractFunction: getAllTickets } = useWeb3Contract({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'getAllTickets',
    params: {},
  })

  const reload = async () => {
    await populateData()
  }

  return (
    <MainLayout isWeb3Enabled={isWeb3Enabled} account={account}>
      <div className="max-w-6xl w-full flex flex-1 h-full flex-row  justify-between  ">
        {/* <h1 className="text-lg underline text-white">Hello World!</h1> */}
        <AllTickets
          tickets={tickets}
          position
          selectTicket={setSelectedTicket}
        />
        {account === ADMIN_ADDRESS ? (
          <CreateTicket reload={reload} />
        ) : (
          <>{selectedTicket && <TicketDetail ticket={selectedTicket} />}</>
        )}
      </div>
    </MainLayout>
  )
}
