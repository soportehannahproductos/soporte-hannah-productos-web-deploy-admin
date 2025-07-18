import { db } from '../config/Firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'

// Obtener todos los productos
export const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'productos'))
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}

// Agregar producto
export const createProduct = async (data) => {
  const docRef = await addDoc(collection(db, 'productos'), data)
  return { id: docRef.id, ...data }
}

// Actualizar producto
export const updateProduct = async (id, data) => {
  const productRef = doc(db, 'productos', id)
  await updateDoc(productRef, data)
}

// Eliminar producto
export const deleteProduct = async (id) => {
  const productRef = doc(db, 'productos', id)
  await deleteDoc(productRef)
}
