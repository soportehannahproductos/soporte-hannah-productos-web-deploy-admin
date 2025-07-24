import React, { useState } from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Avatar,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  Grid,
  TextField,
  Tooltip,
} from '@mui/material'

import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'

import { useTheme } from '@mui/material/styles'

export default function TablaProductos({ products, handleOpen }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!products || products.length === 0) {
    return (
      <Box textAlign="center" py={5}>
        <Typography variant="h6" color="text.secondary">
          Cargando productos...
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      {/* Campo de búsqueda */}
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Buscar producto"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {/* Responsive: tarjetas o tabla */}
      {isMobile ? (
        <Grid container spacing={2}>
          {filteredProducts.map((p) => (
            <Grid item xs={12} key={p.id}>
              <Card
                variant="outlined"
                sx={{ display: 'flex', alignItems: 'center', p: 2 }}
              >
                <Avatar src={p.image} alt={p.title} sx={{ width: 56, height: 56, mr: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">{p.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${p.price.toLocaleString('es-AR')}
                  </Typography>
                </Box>
                <CardActions>
                  <Tooltip title="Ver detalles">
                    <IconButton onClick={() => handleOpen('view', p)} color="primary">
                      <PreviewOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar producto">
                    <IconButton onClick={() => handleOpen('edit', p)} color="warning">
                      <EditNoteOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar producto">
                    <IconButton onClick={() => handleOpen('delete', p)} color="error">
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
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
              <TableCell sx={{ fontWeight: 'bold' }}>Imagen</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((p) => (
              <TableRow key={p.id} hover sx={{ cursor: 'pointer' }}>
                <TableCell>
                  <Avatar
                    alt={p.title}
                    src={p.image}
                    sx={{ width: 40, height: 40 }}
                  />
                </TableCell>
                <TableCell>{p.title}</TableCell>
                <TableCell>${p.price.toLocaleString('es-AR')}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Ver detalles">
                    <IconButton onClick={() => handleOpen('view', p)} color="primary">
                      <PreviewOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar producto">
                    <IconButton onClick={() => handleOpen('edit', p)} color="warning">
                      <EditNoteOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar producto">
                    <IconButton onClick={() => handleOpen('delete', p)} color="error">
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  )
}
