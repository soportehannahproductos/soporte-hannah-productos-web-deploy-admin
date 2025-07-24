import React, { useEffect, useState } from 'react'
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
  MenuItem,
} from '@mui/material'
import { fetchCategorias } from '../../service/categoriaApi' // ✅ asegúrate que la ruta sea correcta

export default function AddModal({
  open,
  onClose,
  formData,
  setFormData,
  onSave,
}) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const data = await fetchCategorias()
        setCategorias(data)
      } catch (error) {
        console.error('Error al cargar categorías:', error)
      }
    }

    getCategorias()
  }, [])

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
        Agregar Producto
      </DialogTitle>

      <DialogContent dividers>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Título"
            value={formData.title || ''}
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
            value={formData.price || ''}
            onChange={(e) => setFormData((f) => ({ ...f, price: e.target.value }))}
            fullWidth
            inputProps={{ min: 0 }}
          />
          <TextField
            label="Cantidad"
            type="number"
            value={formData.quantity || ''}
            onChange={(e) => setFormData((f) => ({ ...f, quantity: e.target.value }))}
            fullWidth
            inputProps={{ min: 1 }}
            helperText="Cantidad disponible"
          />
          <TextField
            label="URL de la imagen"
            value={formData.image || ''}
            onChange={(e) => setFormData((f) => ({ ...f, image: e.target.value }))}
            fullWidth
            helperText="Ingrese la URL completa de la imagen"
          />
          <TextField
            select
            label="Categoría"
            value={formData.category || ''}
            onChange={(e) => setFormData((f) => ({ ...f, category: e.target.value }))}
            fullWidth
          >
            {categorias.map((cat) => (
              <MenuItem key={cat.id} value={cat.nombre}>
                {cat.nombre}
              </MenuItem>
            ))}
          </TextField>
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
        <Button
          onClick={onSave}
          variant="contained"
          disabled={
            !formData.title ||
            !formData.price ||
            !formData.quantity ||
            !formData.description ||
            !formData.image ||
            !formData.category
          }
          sx={{ fontWeight: 'bold' }}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
