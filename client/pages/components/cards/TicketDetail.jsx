import { ABI, CONTRACT_ADDRESS } from '../../../constants'
import { useWeb3Contract } from 'react-moralis'

const TicketDetail = ({ position, ticket }) => {
  const {
    runContractFunction: payTicket,
    data: enterTxResponse,
    isLoading,
    isFetching,
    error,
  } = useWeb3Contract({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'payTicket',
    params: {
      carPlate: ticket['carNumberPlate'].toString(),
      ticketNo: Number(ticket['ticketNumber'].toString()),
    },
    msgValue: Number(ticket['price'].toString()),
  })

  const confirm = async () => {
    try {
      await payTicket()
    } catch (err) {
      console.log(error)
    }
  }
  return (
    <div
      className={`flex w-full flex-col items-center rounded-lg ${
        position ? 'mr-5' : 'ml-5'
      } border-[1px] border-lightBg shadow-md overflow-y-auto overflow-x-hidden`}
    >
      <div className="w-full border-b-[1px] border-b-lightBg p-4">
        <h1 className="text-gray-200 font-medium">Ticket Info</h1>
      </div>

      <div className="flex w-full flex-col p-4 text-gray-100 ">
        {/*  */}

        <div className="flex flex-col flex-1 py-6">
          <h3 className="text-sm font-medium">
            Ticket No:{' '}
            <span className="text-lg font-medium ml-2">
              {ticket['ticketNumber'].toString()}
            </span>
          </h3>

          <h3 className="text-sm font-medium">
            Vehicle Plate:{' '}
            <span className="text-lg font-medium ml-2">
              {ticket['carNumberPlate']}
            </span>
          </h3>

          <h3 className="text-sm font-medium">
            Location:{' '}
            <span className="text-lg font-medium ml-2">
              {ticket['location']}
            </span>
          </h3>

          <h3 className="text-sm font-medium">
            Price:{' '}
            <span className="text-lg font-medium ml-2">
              ${ticket['price'].toString()}
            </span>
          </h3>

          <h3 className="text-sm font-medium">
            Date:{' '}
            <span className="text-lg font-medium ml-2">
              {ticket['issuedAt'].toString()}
            </span>
          </h3>

          <h3 className="text-sm font-medium">
            Admin:{' '}
            <span className="text-lg font-medium ml-2">0xf634...2367ag</span>
          </h3>
        </div>
        <div className="w-full h-1 bg-lightBg my-6"></div>

        {!ticket['isPaid'] && (
          <div className="flex  flex-col justify-center ">
            <button onClick={confirm} className="p-3 bg-blue-600 rounded-full">
              PAY
            </button>
          </div>
        )}
      </div>
      {/*  */}
    </div>
  )
}

export default TicketDetail
