// components/ModalsCategoria/EditCategoriaModal.jsx
import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material'

export default function EditCategoriaModal({ open, categoriaActual, onClose, onSave }) {
  const [valor, setValor] = React.useState(categoriaActual || '')

  React.useEffect(() => {
    setValor(categoriaActual || '')
  }, [categoriaActual])

  const handleSaveClick = () => {
    if (valor.trim()) {
      onSave(valor.trim())
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Categoría</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          label="Nombre de la categoría"
          variant="outlined"
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSaveClick}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
