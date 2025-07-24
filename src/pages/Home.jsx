import React from 'react'
import { Box, Button } from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront'
import CategoryIcon from '@mui/icons-material/Category'
import LanguageIcon from '@mui/icons-material/Language'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        alignItems: 'center',
      }}
    >
      <Button
        variant="contained"
        startIcon={<StorefrontIcon />}
        onClick={() => navigate('/productos')}
        sx={{
          backgroundColor: '#43a047',
          '&:hover': { backgroundColor: '#388e3c' },
          fontWeight: 'bold',
          width: '100%',
          minHeight: 56,
        }}
      >
        Configurar Productos
      </Button>

      <Button
        variant="contained"
        startIcon={<CategoryIcon />}
        onClick={() => navigate('/categorias')}
        sx={{
          backgroundColor: '#7e57c2',
          '&:hover': { backgroundColor: '#673ab7' },
          fontWeight: 'bold',
          width: '100%',
          minHeight: 56,
        }}
      >
        Configurar Categorías
      </Button>

      <Button
        variant="contained"
        startIcon={<LanguageIcon />}
        onClick={() => window.open('https://hannahproductos.com.ar/', '_blank')}
        sx={{
          backgroundColor: '#0288d1',
          '&:hover': { backgroundColor: '#0277bd' },
          fontWeight: 'bold',
          width: '100%',
          minHeight: 56,
        }}
      >
        Ver Sitio Web
      </Button>
    </Box>
  )
}
