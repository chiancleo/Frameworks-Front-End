import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class LivroService {
  livros = []

  createLivro() {
    this.livros.push({ statement: '', autor: '', descricao:'',  imagem:'' })
  }

  updateLivro(livro, index) {
    this.livros[index] = livro
  }

  deleteLivro(index) {
    this.livros.splice(index, 1)
  }
}
