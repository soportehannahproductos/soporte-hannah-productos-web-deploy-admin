import React from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  Box,
  TableContainer,
  Paper,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function TablaCategoria({ categorias = [], handleEdit, handleDelete }) {
  if (categorias.length === 0) {
    return (
      <Box textAlign="center" py={5}>
        <Typography variant="h6" color="text.secondary" fontStyle="italic">
          No hay categorías para mostrar.
        </Typography>
      </Box>
    )
  }

  return (
    <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
      <Table sx={{ minWidth: 320 }} aria-label="tabla de categorías">
        <TableHead sx={{ bgcolor: '#1976d2' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Categoría</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categorias.map((categoria) => (
            <TableRow
              key={categoria.id}
              hover
              sx={{
                '&:hover': { bgcolor: '#e3f2fd' },
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
            >
              <TableCell component="th" scope="row" sx={{ fontWeight: 500, fontSize: '1.05rem' }}>
                {categoria.nombre}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  onClick={() => handleEdit?.(categoria)}
                  color="warning"
                  aria-label="editar"
                  size="large"
                  sx={{ mr: 1 }}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete?.(categoria)}
                  color="error"
                  aria-label="eliminar"
                  size="large"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
