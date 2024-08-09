import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ListContext from './context/ListContext.jsx'
import SearchContext from './context/SearchContext.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ListContext>
      <SearchContext>
        <App />
      </SearchContext>
    </ListContext>
  </BrowserRouter>

)
