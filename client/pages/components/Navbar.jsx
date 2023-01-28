import { Avatar, ConnectButton } from 'web3uikit'

const Navbar = ({ isWeb3Enabled, account }) => {
  return (
    <div className="w-full flex flex-row h-20 justify-center shadow-sm fixed top-0 left-0 right-0">
      <div className="max-w-6xl w-full flex items-center h-full flex-row justify-between">
        <div className="flex flex-1 flex-row items-center">
          <div className="w-10 h-10 rounded-full bg-neutral-500"></div>
          <h1 className="text-gray-300 text-lg ml-4 font-medium">ParkiDapp</h1>
        </div>
        <div className="flex flex-1 h-full w-full items-center">
          <input
            placeholder="Search for Ticket No or Vehicle plates"
            className="w-full h-10 rounded-md bg-lightBg outline-none text-white px-4 "
            type="text"
          />
        </div>
        <div className="flex flex-1 flex-row w-full h-full items-center justify-end">
          <ConnectButton moralisAuth={false} />
        </div>
      </div>
    </div>
  )
}

export default Navbar
