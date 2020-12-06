import { useState } from 'react'
import books from './livros.json'

export default function useBookData() {
  const [livros, setLivros] = useState(books)

  // insere um novo livro em branco em `livros`.
  const createLivro = () => {
    setLivros([...livros, { statement: '', autor: '', descricao: '', imagem: '' }])
  }

  // substitui o livro que se encontra em `index` pelo livro passado.
  const updateLivro = (livro, index) => {
    setLivros([
      ...livros.slice(0, index),
      livro,
      ...livros.slice(index + 1)
    ])
  }

  // remove de `livros` o livro de índice passado.
  const deleteLivro = (index) => {
    setLivros([...livros.slice(0, index), ...livros.slice(index + 1)])
  }

  return { livros, createLivro, updateLivro, deleteLivro }
}