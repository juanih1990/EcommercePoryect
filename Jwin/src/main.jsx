import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import {GoogleOAuthProvider} from '@react-oauth/google'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId = '521703023200-bnfjdk0sm2ge5lnuvlecnacng46gqf8v.apps.googleusercontent.com'>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
