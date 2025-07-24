// src/components/RequireAuth.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const logueado = localStorage.getItem('logueado') === 'true'
  return logueado ? children : <Navigate to="/login" />
}
