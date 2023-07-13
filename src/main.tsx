import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <React.StrictMode>

        <BrowserRouter>
          {/*side bar*/}
          <App />
        </BrowserRouter>

      </React.StrictMode>
      <ReactQueryDevtools initialIsOpen={false} />
      </RecoilRoot>
  </QueryClientProvider>
)
