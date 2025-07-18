import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'

import ViewModal from '../components/modales/ViewModal'
import EditModal from '../components/modales/EditModal'
import AddModal from '../components/modales/AddModal'
import DeleteModal from '../components/modales/DeleteModal'

import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../service/ecApi'

export default function Home() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalType, setModalType] = useState('')
  const [open, setOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
    quantity: 1
  })

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productos = await fetchProducts()
        setProducts(productos)
      } catch (error) {
        console.error('Error al cargar productos:', error)
      }
    }
    loadProducts()
  }, [])

  const handleOpen = (type, product = null) => {
    setModalType(type)
    setSelectedProduct(product)

    if (type === 'edit' && product) {
      setFormData({
        title: product.title || '',
        price: product.price || '',
        description: product.description || '',
        image: product.image || '',
        category: product.category || '',
        quantity: product.quantity || 1
      })
    } else if (type === 'add') {
      setFormData({
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
        quantity: 1
      })
    }

    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedProduct(null)
    setModalType('')
  }

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.price || isNaN(formData.price)) return

    try {
      if (modalType === 'edit' && selectedProduct?.id) {
        await updateProduct(selectedProduct.id, {
          ...formData,
          price: Number(formData.price),
          quantity: Number(formData.quantity)
        })

        setProducts(prev =>
          prev.map(p =>
            p.id === selectedProduct.id
              ? { ...p, ...formData, price: Number(formData.price) }
              : p
          )
        )
      } else if (modalType === 'add') {
        const newProduct = {
          ...formData,
          price: Number(formData.price),
          quantity: Number(formData.quantity)
        }
        const added = await createProduct(newProduct)
        setProducts(prev => [...prev, added])
      }

      handleClose()
    } catch (error) {
      console.error('Error al guardar producto:', error)
    }
  }

  const handleDelete = async () => {
    if (!selectedProduct?.id) return

    try {
      await deleteProduct(selectedProduct.id)
      setProducts(prev => prev.filter(p => p.id !== selectedProduct.id))
      handleClose()
    } catch (error) {
      console.error('Error al eliminar producto:', error)
    }
  }

  return (
    <Box sx={{ maxWidth: 900, margin: 'auto', mt: 5, px: 2 }}>
    <Box
  sx={{
    display: 'flex',
    gap: 2,         // espacio entre botones
    flexWrap: 'wrap', // que se adapten en pantallas chicas
    justifyContent: 'center',
    mb: 3
  }}
>
  <Button
    variant="contained"
    startIcon={<AddBusinessIcon />}
    onClick={() => handleOpen('add')}
    sx={{
      backgroundColor: '#43a047',
      '&:hover': { backgroundColor: '#388e3c' },
      fontWeight: 'bold',
      boxShadow: '0 4px 12px rgba(76, 175, 80, 0.6)',
      minWidth: 180
    }}
  >
    Agregar Producto
  </Button>

  <Button
    variant="outlined"
    onClick={() => window.open('https://imgur.com/upload', '_blank')}
    sx={{
      borderColor: '#8e24aa',
      color: '#8e24aa',
      fontWeight: 'bold',
      '&:hover': {
        borderColor: '#6a1b9a',
        backgroundColor: '#f3e5f5'
      },
      minWidth: 180
    }}
  >
    Subir imagen a Imgur y copiar URL
  </Button>

 
</Box>


     
      <Table
        sx={{
          bgcolor: '#fdfdfd',
          borderRadius: 2,
          boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}
      >
        <TableHead sx={{ bgcolor: '#d1c4e9' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id} hover sx={{ cursor: 'pointer' }}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.title}</TableCell>
              <TableCell>${p.price.toLocaleString('es-AR')}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => handleOpen('view', p)} color="primary" aria-label="ver">
                  <VisibilityIcon />
                </IconButton>
                <IconButton onClick={() => handleOpen('edit', p)} color="warning" aria-label="editar">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleOpen('delete', p)} color="error" aria-label="eliminar">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Separador para futura sección */}
      <Divider sx={{ my: 5 }} />

      {/* Placeholder: sección para controlar ventas */}
      <Typography variant="h5" textAlign="center" color="text.secondary" fontWeight="bold" mb={2}>
        Control de Ventas (próximamente)
      </Typography>
      <Typography variant="body2" textAlign="center" color="text.secondary">
        Aquí podrás ver las ventas realizadas, su estado, y estadísticas de ingresos.
      </Typography>

      {/* Modales */}
      {modalType === 'view' && (
        <ViewModal open={open} onClose={handleClose} product={selectedProduct} />
      )}
      {modalType === 'edit' && (
        <EditModal
          open={open}
          onClose={handleClose}
          product={selectedProduct}
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
        />
      )}
      {modalType === 'add' && (
        <AddModal
          open={open}
          onClose={handleClose}
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
        />
      )}
      {modalType === 'delete' && (
        <DeleteModal
          open={open}
          onClose={handleClose}
          product={selectedProduct}
          onDelete={handleDelete}
        />
      )}
    </Box>
  )
}
