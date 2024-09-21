import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppWrapper } from './context/authContext.jsx';

document.documentElement.className = localStorage.getItem('techlog-theme');


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AppWrapper> 
      <App />
  </AppWrapper>
  // </React.StrictMode>,
)
