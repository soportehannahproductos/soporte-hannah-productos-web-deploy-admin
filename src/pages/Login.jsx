import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Fade
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

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
      sx={{
        background: 'linear-gradient(135deg, #fdfbfb, #ebedee)',
        px: 2,
      }}
    >
      <Fade in>
        <Paper
          elevation={8}
          sx={{
            padding: 5,
            maxWidth: 400,
            width: '100%',
            borderRadius: 4,
            textAlign: 'center',
            boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <LockOutlinedIcon
            sx={{
              fontSize: 40,
              color: '#1976d2',
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 700, color: '#333' }}
          >
            Iniciar sesión
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#666', mb: 3 }}
          >
            Acceso restringido
          </Typography>

          <TextField
            label="Clave"
            type="password"
            fullWidth
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
            onClick={handleLogin}
            sx={{ mt: 3, borderRadius: 2 }}
          >
            Ingresar
          </Button>
        </Paper>
      </Fade>
    </Box>
  )
}
