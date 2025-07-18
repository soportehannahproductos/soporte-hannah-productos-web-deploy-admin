import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  Box,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material'

export default function ViewModal({ open, onClose, product }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  if (!product) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          background: 'linear-gradient(to right, #b3d4fc, #e8b3fc)',
          color: '#222',
          borderRadius: fullScreen ? 0 : 16,
          padding: fullScreen ? '16px 12px' : '24px',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '1.2rem', sm: '1.5rem' },
          color: '#e87afc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        {product.title}
      </DialogTitle>

      <DialogContent dividers>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.title}
            onError={(e) => {
              e.target.onerror = null
              e.target.src =
                'https://http2.mlstatic.com/D_NQ_NP_2X_957198-MLA49876337542_052022-F.webp'
            }}
            sx={{
              maxWidth: '100%',
              maxHeight: 250,
              borderRadius: 2,
              boxShadow: '0 0 12px rgba(0,255,0,0.3)',
              objectFit: 'contain',
            }}
          />
          <Chip
            label={product.category}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>

        <Typography variant="body1" gutterBottom sx={{ color: '#333' }}>
          {product.description || 'Sin descripción disponible.'}
        </Typography>

        <Typography variant="h5" fontWeight="bold" color="black" mb={2}>
          Precio: ${product.price.toLocaleString('es-AR')}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          mt={2}
          display="block"
          textAlign="center"
        >
          ID del producto: {product.id}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{ fontWeight: 'bold', px: 4 }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
