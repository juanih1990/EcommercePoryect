import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Auth0Provider } from '@auth0/auth0-react'
const queryClient = new QueryClient()
const redirectUri = window.location.origin
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-ejgsjvy3irf5odvx.us.auth0.com'
      clientId='sQHL2fzQtUbzK0GLaFBS5GjOv4MPsJAz'
      authorizationParams={{
        redirect_uri: redirectUri,
      }} >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
