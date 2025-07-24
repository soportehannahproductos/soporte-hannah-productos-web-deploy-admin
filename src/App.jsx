// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Layout/Header'
import './App.css'
import ConfigCategoria from './pages/ConfigCategoria'
import Productos from './pages/Prodructos'
import Login from './pages/Login'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f0f8ff, #fef6ff)',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/categorias"
          element={
            <RequireAuth>
              <ConfigCategoria />
            </RequireAuth>
          }
        />
        <Route
          path="/productos"
          element={
            <RequireAuth>
              <Productos />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  )
}

export default App
