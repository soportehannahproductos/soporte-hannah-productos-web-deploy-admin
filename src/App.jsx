import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Layout/Header'
import './App.css';
function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f0f8ff, #fef6ff)',
        fontFamily: 'Montserrat, sans-serif'
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Puedes añadir más rutas aquí */}
      </Routes>
    </div>
  )
}

export default App
