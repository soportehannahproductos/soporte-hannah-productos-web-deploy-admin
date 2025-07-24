// components/ModalsCategoria/DeleteCategoriaModal.jsx
import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'

export default function DeleteCategoriaModal({ open, categoria, onClose, onDelete }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Eliminar Categoría</DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro que deseas eliminar la categoría "<strong>{categoria}</strong>"?
          Esta acción no se puede deshacer.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="error" onClick={() => onDelete(categoria)}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
