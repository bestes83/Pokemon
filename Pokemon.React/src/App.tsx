import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/header'
import PokemonList from './pages/PokemonList'
import PokemonDetail from './pages/PokemonDetail'

import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<PokemonList />}></Route>
          <Route path="/pokemondetail/:id" element={<PokemonDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
