import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from '@mui/material'

export default function DeleteModal({ open, onClose, product, onDelete }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Eliminar Producto</DialogTitle>
      <DialogContent dividers>
        {product ? (
          <Typography>
            ¿Estás seguro que deseas eliminar el producto <b>{product.name}</b>?
          </Typography>
        ) : (
          <Typography>No hay producto seleccionado</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onDelete} variant="contained" color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
