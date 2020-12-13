import { useState } from 'react'
import books from './livros.json'

export default function useBookData() {
  const [livros, setLivros] = useState(books)
  const [ebooks, setEbooks] = useState(books)
  const [apostilas, setApostilas] = useState(books)

  const createLivro = () => {
    setLivros([...livros, { statement: '', autor: '', descricao: '', imagem: '' }])
  }

  const updateLivro = (livro, index) => {
    setLivros([
      ...livros.slice(0, index),
      livro,
      ...livros.slice(index + 1)
    ])
  }

  const deleteLivro = (index) => {
    setLivros([...livros.slice(0, index), ...livros.slice(index + 1)])
  }
  //________________________________________________________________________________

  const createEbook = () => {
    setEbooks([...ebooks, { statement: '', autor: '', descricao: '', imagem: '' }])
  }

  const updateEbook = (ebook, index) => {
    setEbooks([
      ...ebooks.slice(0, index),
      ebook,
      ...ebooks.slice(index + 1)
    ])
  }

  const deleteEbook = (index) => {
    setEbooks([...ebooks.slice(0, index), ...ebooks.slice(index + 1)])
  }

    //________________________________________________________________________________
  const createApostila = () => {
    setApostilas([...apostilas, { statement: '', autor: '', descricao: '', imagem: '' }])
  }

  const updateApostila = (apostila, index) => {
    setApostilas([
      ...apostilas.slice(0, index),
      apostila,
      ...apostilas.slice(index + 1)
    ])
  }

  const deleteApostila = (index) => {
    setApostilas([...apostilas.slice(0, index), ...apostilas.slice(index + 1)])
  }



  return { livros, createLivro, updateLivro, deleteLivro,
           ebooks, createEbook, updateEbook, deleteEbook,
           apostilas, createApostila, updateApostila, deleteApostila  
  }
}