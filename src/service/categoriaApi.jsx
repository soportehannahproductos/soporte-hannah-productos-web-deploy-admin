import { db } from '../config/Firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'

const categoriaCollection = collection(db, 'categorias')

export const fetchCategorias = async () => {
  const snapshot = await getDocs(categoriaCollection)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const createCategoria = async (data) => {
  const docRef = await addDoc(categoriaCollection, data)
  return { id: docRef.id, ...data }
}

export const updateCategoria = async (id, data) => {
  const docRef = doc(db, 'categorias', id)
  await updateDoc(docRef, data)
}

export const deleteCategoria = async (id) => {
  const docRef = doc(db, 'categorias', id)
  await deleteDoc(docRef)
}