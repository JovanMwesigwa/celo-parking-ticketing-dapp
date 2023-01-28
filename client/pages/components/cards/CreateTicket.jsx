const CreateTicket = ({ position }) => {
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
            className="outline-none p-3 rounded-md bg-lightBg text-white"
          />
        </div>
        {/*  */}

        <div className="flex flex-col my-3">
          <label htmlFor="plate" className="text-white text-sm">
            Location
          </label>
          <input
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
            className="outline-none p-3 rounded-md bg-lightBg text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 my-3 bg-blue-600 text-white rounded-md"
        >
          Create
        </button>
        {/*  */}
      </div>
    </div>
  )
}

export default CreateTicket
