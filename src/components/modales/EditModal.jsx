import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material'

export default function EditModal({ open, onClose, product, formData, setFormData, onSave }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const isSaveDisabled =
    !formData.title?.trim() ||
    !formData.price ||
    isNaN(formData.price) ||
    !formData.category?.trim() ||
    !formData.image?.trim() ||
    !formData.quantity ||
    isNaN(formData.quantity) ||
    Number(formData.quantity) < 1

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
        Editar Producto
      </DialogTitle>

      <DialogContent dividers>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="Nombre"
            value={formData.title}
            onChange={(e) => setFormData((f) => ({ ...f, title: e.target.value }))}
            fullWidth
          />
          <TextField
            label="Descripción"
            multiline
            minRows={3}
            value={formData.description || ''}
            onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
            fullWidth
          />
          <TextField
            label="Precio"
            type="number"
            inputProps={{ min: 0, step: '0.01' }}
            value={formData.price}
            onChange={(e) => setFormData((f) => ({ ...f, price: e.target.value }))}
            fullWidth
          />
          <TextField
            label="Cantidad"
            type="number"
            inputProps={{ min: 1, step: '1' }}
            value={formData.quantity || ''}
            onChange={(e) => setFormData((f) => ({ ...f, quantity: e.target.value }))}
            fullWidth
          />
          <TextField
            label="URL de la imagen"
            value={formData.image}
            onChange={(e) => setFormData((f) => ({ ...f, image: e.target.value }))}
            fullWidth
          />
          <TextField
            label="Categoría"
            value={formData.category}
            onChange={(e) => setFormData((f) => ({ ...f, category: e.target.value }))}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          sx={{
            color: '#222',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#ddd' },
          }}
        >
          Cancelar
        </Button>
        <Button onClick={onSave} variant="contained" disabled={isSaveDisabled} sx={{ fontWeight: 'bold' }}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
