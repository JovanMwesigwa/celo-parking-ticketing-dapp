import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useMoralis, useWeb3Contract } from 'react-moralis'

const AllTickets = dynamic(() => import('./components/cards/AllTickets'))
const CreateTicket = dynamic(() => import('./components/cards/CreateTicket'))
const TicketDetail = dynamic(() => import('./components/cards/TicketDetail'))
const MainLayout = dynamic(() => import('./components/MainLayout'))

export default function Home() {
  const { isWeb3Enabled, Moralis, account } = useMoralis()

  const [selectedTicket, setSelectedTicket] = useState(null)
  const [adminAddress, setAdminAddress] = useState(
    '0x5cbdf5f9e468df3888e04155668ccafc6f6c4dcf'
  )

  useEffect(() => {}, [isWeb3Enabled, account])
  return (
    <MainLayout isWeb3Enabled={isWeb3Enabled} account={account}>
      <div className="max-w-6xl w-full flex flex-1 h-full flex-row  justify-between  ">
        {/* <h1 className="text-lg underline text-white">Hello World!</h1> */}
        <AllTickets position selectTicket={setSelectedTicket} />
        {account === adminAddress ? (
          <CreateTicket />
        ) : (
          <>{selectedTicket && <TicketDetail ticket={selectedTicket} />}</>
        )}
      </div>
    </MainLayout>
  )
}
