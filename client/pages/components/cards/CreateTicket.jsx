import { useState } from 'react'
import { ABI, CONTRACT_ADDRESS } from '../../../constants'
import { useWeb3Contract } from 'react-moralis'
import { ethers } from 'ethers'

const CreateTicket = ({ position, reload }) => {
  const [carPlate, setCarPlate] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')

  const {
    runContractFunction: create,
    data: enterTxResponse,
    isLoading,
    isFetching,
    error,
  } = useWeb3Contract({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'createTicket',
    params: {
      enteredLocation: location,
      carPlate: carPlate,
      // tixPrice: ethers.utils.parseEther(price.toString()),
      tixPrice: price,
    },
  })

  const confirm = async () => {
    try {
      if (!carPlate || !location || !price) {
        alert('Some fields missing')
      }

      await create()
      await reload()
      setCarPlate('')
      setLocation('')
      setPrice('')
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
        <h1 className="text-gray-200 font-medium">Create New Ticket</h1>
      </div>

      <div className="flex w-full flex-col p-5">
        <div className="flex flex-col my-3">
          <label htmlFor="plate" className="text-white text-sm">
            Vehicle Plate
          </label>
          <input
            type="text"
            value={carPlate}
            onChange={(e) => setCarPlate(e.target.value)}
            className="outline-none p-3 rounded-md bg-lightBg text-white"
          />
        </div>
        {/*  */}

        <div className="flex flex-col my-3">
          <label htmlFor="plate" className="text-white text-sm">
            Location
          </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            className="outline-none p-3 rounded-md bg-lightBg text-white"
          />
        </div>

        {/*  */}
        <div className="flex flex-col my-3">
          <label htmlFor="plate" className="text-white text-sm">
            Price
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="outline-none p-3 rounded-md bg-lightBg text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 my-3 bg-blue-600 text-white rounded-md"
          onClick={confirm}
          disabled={isLoading || isFetching}
        >
          {isLoading || isFetching ? 'Loading' : 'Create'}
        </button>
        {/*  */}
      </div>
    </div>
  )
}

export default CreateTicket
