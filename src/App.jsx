import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import './App.css'
import ConfigCategoria from './pages/ConfigCategoria'
import Productos from './pages/Prodructos'
import Login from './pages/Login'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f0f8ff, #fef6ff)',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      <Header />

      {/* Contenido principal que puede crecer */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/login" element={<Login />} />

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

      {/* Footer fijo al fondo si no hay contenido */}
      <Footer />
    </div>
  )
}

export default App
