import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import StorefrontIcon from '@mui/icons-material/Storefront'
import CategoryIcon from '@mui/icons-material/Category'
import LogoutIcon from '@mui/icons-material/Logout'
import logo from '../../assets/logo2.png'

export default function Header() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const handleNavigate = (path) => {
    navigate(path)
    handleMenuClose()
  }

  const handleLogout = () => {
    localStorage.removeItem('logueado')
    navigate('/login')
  }

  const items = [
    { label: 'Inicio', path: '/', icon: <HomeIcon fontSize="small" sx={{ mr: 1 }} /> },
    { label: 'Productos', path: '/productos', icon: <StorefrontIcon fontSize="small" sx={{ mr: 1 }} /> },
    { label: 'Categorías', path: '/categorias', icon: <CategoryIcon fontSize="small" sx={{ mr: 1 }} /> },
  ]

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
          onClick={() => handleNavigate('/')}
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
                fontStyle: 'italic'
              }}
            >
              Administrador
            </Typography>
          </Box>
        </Box>

        {/* Navegación */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {!isMobile ? (
            // 🖥️ Desktop: mostrar botones + botón cerrar sesión con iconos
            <>
              {items.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    color: '#444',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                      color: '#000',
                      backgroundColor: 'rgba(0,0,0,0.04)'
                    }
                  }}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
              <Button
                color="error"
                variant="outlined"
                onClick={handleLogout}
                sx={{
                  textTransform: 'none',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                Cerrar sesión
              </Button>
            </>
          ) : (
            // 📱 Mobile: menú hamburguesa + opción cerrar sesión con iconos
            <>
              <IconButton
                aria-label="menú"
                onClick={handleMenuOpen}
                sx={{ color: '#444' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                {items.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => handleNavigate(item.path)}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    {item.icon}
                    {item.label}
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={handleLogout}
                  sx={{ color: 'red', display: 'flex', alignItems: 'center' }}
                >
                  <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
