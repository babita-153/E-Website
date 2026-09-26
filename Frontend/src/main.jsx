
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoute from './routes/AppRoute.jsx'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AuthContextProvider } from './context/useAuthContext.jsx'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(


 <AuthContextProvider>
   <QueryClientProvider client={queryClient}>
          <AppRoute />
    </QueryClientProvider>
 </AuthContextProvider>

   

  
 
)
