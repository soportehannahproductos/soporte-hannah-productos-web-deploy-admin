import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper,
  Divider,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'  // Importar useNavigate
import { fetchCategorias, createCategoria, updateCategoria, deleteCategoria } from '../service/categoriaApi'
import TablaCategoria from '../components/TablaCategoria'

export default function ConfigCategoria() {
  const navigate = useNavigate() // Hook para navegación

  const [categorias, setCategorias] = useState([])
  const [nuevaCategoria, setNuevaCategoria] = useState('')
  const [editCategoria, setEditCategoria] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const cargarCategorias = async () => {
      setLoading(true)
      try {
        const cats = await fetchCategorias()
        setCategorias(cats)
      } catch (error) {
        console.error('Error al obtener categorías:', error)
      } finally {
        setLoading(false)
      }
    }
    cargarCategorias()
  }, [])

  const handleAgregarCategoria = async () => {
    if (loading) return
    if (!nuevaCategoria.trim()) return
    if (categorias.some(c => c.nombre.toLowerCase() === nuevaCategoria.trim().toLowerCase())) {
      alert('La categoría ya existe')
      return
    }
    setLoading(true)
    try {
      const nuevaCat = await createCategoria({ nombre: nuevaCategoria.trim() })
      setCategorias(prev => [...prev, nuevaCat])
      setNuevaCategoria('')
    } catch (error) {
      console.error('Error al crear categoría:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (categoria) => {
    setEditCategoria(categoria)
    setEditValue(categoria.nombre)
    setOpenEditDialog(true)
  }

  const handleSaveEdit = async () => {
    if (!editValue.trim()) return
    setLoading(true)
    try {
      await updateCategoria(editCategoria.id, { nombre: editValue.trim() })
      setCategorias(prev =>
        prev.map(c => (c.id === editCategoria.id ? { ...c, nombre: editValue.trim() } : c))
      )
      setOpenEditDialog(false)
      setEditCategoria(null)
      setEditValue('')
    } catch (error) {
      console.error('Error al actualizar categoría:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDelete = (categoria) => {
    setCategoriaAEliminar(categoria)
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    setLoading(true)
    try {
      await deleteCategoria(categoriaAEliminar.id)
      setCategorias(prev => prev.filter(c => c.id !== categoriaAEliminar.id))
      setOpenDeleteDialog(false)
      setCategoriaAEliminar(null)
    } catch (error) {
      console.error('Error al eliminar categoría:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDownNuevaCategoria = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAgregarCategoria()
    }
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6, px: 3 }}>
      {/* Botón para volver a inicio */}
      <Button
        variant="outlined"
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        Volver a Inicio
      </Button>

      <Typography
        variant="h4"
        mb={4}
        fontWeight="bold"
        textAlign="center"
        color="primary"
        sx={{ letterSpacing: 1.2 }}
      >
        Configuración de Categorías
      </Typography>

      <Grid container spacing={5}>
        {/* Formulario */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: 'background.paper',
              boxShadow: '0 6px 12px rgba(25, 118, 210, 0.2)',
            }}
          >
            <Typography
              variant="h6"
              mb={3}
              fontWeight="bold"
              color="primary"
              sx={{ letterSpacing: 1 }}
            >
              Agregar nueva categoría
            </Typography>

            <TextField
              label="Nombre de nueva categoría"
              variant="outlined"
              fullWidth
              value={nuevaCategoria}
              onChange={(e) => setNuevaCategoria(e.target.value)}
              onKeyDown={handleKeyDownNuevaCategoria}
              sx={{ mb: 3 }}
              autoFocus
              disabled={loading}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleAgregarCategoria}
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(25, 118, 210, 0.4)',
                '&:hover': {
                  boxShadow: '0 6px 14px rgba(25, 118, 210, 0.7)',
                },
              }}
              disabled={!nuevaCategoria.trim() || loading}
            >
              Agregar Categoría
            </Button>
          </Paper>
        </Grid>

        {/* Tabla */}
        <Grid item xs={12} md={7}>
          <Typography
            variant="h6"
            mb={2}
            fontWeight="medium"
            color="text.primary"
            sx={{ letterSpacing: 0.8 }}
          >
            Categorías existentes:
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {loading ? (
            <Typography textAlign="center" fontStyle="italic" color="text.secondary">
              Cargando categorías...
            </Typography>
          ) : (
            <TablaCategoria
              categorias={categorias}
              handleEdit={handleEdit}
              handleDelete={handleOpenDelete}
            />
          )}
        </Grid>
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Editar Categoría</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus
            sx={{ mt: 1 }}
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSaveEdit()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSaveEdit} disabled={loading}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Eliminar Categoría</DialogTitle>
        <DialogContent>
          <Typography fontWeight="medium" sx={{ mt: 1 }}>
            ¿Seguro que deseas eliminar la categoría &quot;{categoriaAEliminar?.nombre}&quot;?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            disabled={loading}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
