import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import Checkout from './pages/Checkout'
import Result from './pages/Result'
import Search from './pages/Search'
import './styles.css'

function App(){
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/experiences/:id' element={<Details/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
    </HashRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
