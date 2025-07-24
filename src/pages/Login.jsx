import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, Paper } from '@mui/material'

export default function Login() {
  const [clave, setClave] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (clave === import.meta.env.VITE_LOGIN_CLAVE) {
      localStorage.setItem('logueado', 'true')
      navigate('/')
    } else {
      setError(true)
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ background: 'linear-gradient(135deg, #ece9e6, #ffffff)' }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          maxWidth: 400,
          width: '90%',
          borderRadius: 3,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#333', mb: 3, textAlign: 'center' }}
        >
          Iniciar sesión
        </Typography>
        <TextField
          label="Clave"
          type="password"
          fullWidth
          margin="normal"
          value={clave}
          onChange={(e) => {
            setClave(e.target.value)
            setError(false)
          }}
          error={error}
          helperText={error ? 'Clave incorrecta' : ''}
          autoFocus
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 3, borderRadius: 2 }}
          onClick={handleLogin}
        >
          Ingresar
        </Button>
      </Paper>
    </Box>
  )
}
