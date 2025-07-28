import React from 'react'
import { Box, Typography, Link, useTheme, useMediaQuery } from '@mui/material'

export default function Footer() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 3,
        px: 2,
        background: 'linear-gradient(to right, #ffffff, #dfe9f3)',
        color: '#444',
        borderTop: '1px solid #ccc',
        textAlign: 'center'
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        Hannah Products
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap', mb: 1 }}>
        <Link href="/" underline="hover" color="inherit">Inicio</Link>
        <Link href="/productos" underline="hover" color="inherit">Productos</Link>
        <Link href="/categorias" underline="hover" color="inherit">Categorías</Link>
      </Box>

      <Typography variant="body2" sx={{ color: '#777' }}>
        © {new Date().getFullYear()} Hannah Products. Todos los derechos reservados.
      </Typography>
    </Box>
  )
}
