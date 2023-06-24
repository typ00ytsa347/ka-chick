import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { WebsocketProvider } from './context/WebSocketContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WebsocketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WebsocketProvider>  
  </React.StrictMode>,
)
