import Footer from './Footer'
import Navbar from './Navbar'

const MainLayout = ({ children, isWeb3Enabled, account }) => {
  return (
    <div className="bg-[#101322] w-full h-screen relative">
      <Navbar isWeb3Enabled={isWeb3Enabled} account={account} />
      <div className="w-full flex flex-1 h-full flex-col pt-24 pb-10 items-center justify-center">
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default MainLayout
