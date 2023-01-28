import TicketCard from './TicketCard'
import tickets from '../../../data/data'

const AllTickets = ({ position, selectTicket }) => {
  return (
    <div
      className={`flex w-full flex-col items-center rounded-lg ${
        position ? 'mr-5' : 'ml-5'
      } border-[1px] border-lightBg shadow-md overflow-y-auto overflow-x-hidden`}
    >
      <div className="w-full border-b-[1px] border-b-lightBg p-4">
        <h1 className="text-gray-200 font-medium">All Tickets</h1>
      </div>

      <div
        className="flex w-full flex-col items-center 
       overflow-y-auto overflow-x-hidden"
      >
        {tickets.map((item) => (
          <TicketCard
            selectTicket={selectTicket}
            key={item.ticketNumber}
            cleared={item.isPaid}
            item={item}
          />
        ))}
      </div>
      {/*  */}
    </div>
  )
}

export default AllTickets
