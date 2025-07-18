import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  // Badge,
  Box,
  Menu,
  MenuItem
} from '@mui/material'
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
// import StoreIcon from '@mui/icons-material/Store'
import MenuIcon from '@mui/icons-material/Menu'

import logo from '../../assets/logo2.png'

export default function Header() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)

  const categorias = ['Indumentaria', 'Herramientas', 'Artefactos']

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(to right, #dfe9f3, #ffffff)',
        color: '#222',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
        {/* Logo + Marca */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <Box
            component="img"
            src={logo}
            alt="Hannah Logo"
            sx={{
              width: { xs: 50, md: 70 },
              height: { xs: 40, md: 60 },
              objectFit: 'cover',
              borderRadius: '10px'
            }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1rem', md: '1.4rem' },
                color: '#222',
                letterSpacing: '0.5px'
              }}
            >
              Hannah
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#777',
                fontSize: '0.7rem',
                letterSpacing: '4px'
              }}
            >
              PRODUCTS
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#999',
                fontSize: '0.7rem',
                fontStyle: 'italic',
                mt: 0.5
              }}
            >
              Administrador
            </Typography>
          </Box>
        </Box>

        {/* Botones del lado derecho */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Íconos deshabilitados por ahora */}
          {/*
          <IconButton
            aria-label="ventas"
            onClick={() => navigate('/ventas')}
            sx={{ color: '#444' }}
          >
            <Badge badgeContent={3} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton
            aria-label="mis-productos"
            onClick={() => navigate('/misproductos')}
            sx={{ color: '#444' }}
          >
            <Badge badgeContent={3} color="secondary">
              <StoreIcon />
            </Badge>
          </IconButton>
          */}

          {/* Menú hamburguesa móvil */}
          <IconButton
            aria-label="categorías"
            onClick={handleMenuOpen}
            sx={{
              display: { xs: 'inline-flex', md: 'none' },
              color: '#444'
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Menú desplegable de categorías */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {categorias.map((categoria) => (
            <MenuItem
              key={categoria}
              onClick={() => {
                navigate(`/categoria/${categoria.toLowerCase()}`)
                handleMenuClose()
              }}
            >
              {categoria}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
