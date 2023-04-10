import '../styles/globals.css'
import AppStore from '../contexts/CommentContext'
// import { QueryClientProvider, QueryClient } from 'react-query'


// const queryClient = new QueryClient()


function MyApp({ Component, pageProps }) {
  return (
    // <QueryClientProvider client={queryClient}>
    <AppStore>

      <Component {...pageProps} />

    </AppStore>
    // </QueryClientProvider>
  )
}

export default MyApp
