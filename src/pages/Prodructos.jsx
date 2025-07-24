import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Typography,
  Divider,
} from '@mui/material'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CategoryIcon from '@mui/icons-material/Category'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { useNavigate } from 'react-router-dom'

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

import TablaProductos from '../components/TablaProductos'

export default function Productos() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalType, setModalType] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

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
    <Box sx={{ maxWidth: 1000, margin: 'auto', mt: 5, px: 2 }}>
      {/* Botones principales */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center',
          mb: 4
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
            minWidth: 200
          }}
        >
          Agregar Producto
        </Button>

        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          onClick={() => window.open('https://imgur.com/upload', '_blank')}
          sx={{
            borderColor: '#8e24aa',
            color: '#8e24aa',
            fontWeight: 'bold',
            '&:hover': {
              borderColor: '#6a1b9a',
              backgroundColor: '#f3e5f5'
            },
            minWidth: 200
          }}
        >
          Subir imagen a Imgur
        </Button>

        <Button
          variant="contained"
          startIcon={<CategoryIcon />}
          onClick={() => navigate('/categorias')}
          sx={{
            fontWeight: 'bold',
            backgroundColor: '#7e57c2',
            '&:hover': { backgroundColor: '#673ab7' },
            boxShadow: '0 4px 12px rgba(103, 58, 183, 0.4)',
            minWidth: 200
          }}
        >
          Configurar Categorías
        </Button>

        <Button
          variant="outlined"
          startIcon={<StorefrontIcon />}
          onClick={() => navigate('/')}
          sx={{
            borderColor: '#1976d2',
            color: '#1976d2',
            fontWeight: 'bold',
            '&:hover': {
              borderColor: '#1565c0',
              backgroundColor: '#e3f2fd'
            },
            minWidth: 200
          }}
        >
          Ir al Home
        </Button>
      </Box>

      {/* Tabla de productos */}
      <TablaProductos products={products} handleOpen={handleOpen} />

      {/* Separador */}
      <Divider sx={{ my: 5 }} />

      {/* Placeholder de control de ventas */}
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
