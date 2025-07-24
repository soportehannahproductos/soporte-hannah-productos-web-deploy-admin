import React from 'react'
import { Box, Typography, TextField, Button, Paper, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function ConfigCategoria() {
  // Ejemplo estático de categorías para mostrar estructura
  const categorias = [
    { id: '1', nombre: 'Tecnología' },
    { id: '2', nombre: 'Salud' },
    { id: '3', nombre: 'Educación' },
  ]

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 6, px: 3 }}>
      <Typography variant="h4" mb={4} fontWeight="bold" textAlign="center" color="primary">
        Configuración de Categorías
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: 'flex',
          gap: 2,
          mb: 4,
        }}
      >
        <TextField
          label="Nombre de nueva categoría"
          variant="outlined"
          fullWidth
          size="medium"
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{ px: 4 }}
          disableElevation
        >
          Agregar
        </Button>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <List>
          {categorias.map(({ id, nombre }, index) => (
            <React.Fragment key={id}>
              <ListItem
                secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="editar" color="primary" sx={{ mr: 1 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="eliminar" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
                sx={{
                  px: 3,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'action.hover',
                    cursor: 'pointer',
                  },
                }}
              >
                <ListItemText primary={nombre} primaryTypographyProps={{ fontWeight: 500, fontSize: '1.1rem' }} />
              </ListItem>
              {index < categorias.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  )
}
