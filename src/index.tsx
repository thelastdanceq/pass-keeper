import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { AuthProvider } from './contexts/Auth'
import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import { firebaseConfig } from './constants/firebase/firebase'
import { theme } from './constants/theme/theme'

export const app = initializeApp(firebaseConfig)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
)
