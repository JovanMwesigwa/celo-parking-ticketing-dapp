import '@/styles/globals.css'
import dynamic from 'next/dynamic'
import { MoralisProvider } from 'react-moralis'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <Component {...pageProps} />
    </MoralisProvider>
  )
}

// export default MyApp
export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
})
