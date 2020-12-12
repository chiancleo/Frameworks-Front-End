import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class EbookService {
  livros = [
    {
      "statement": "Dom Casmurro",
      "autor": "Machado de Assis",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.",
      "imagem": "https://images-na.ssl-images-amazon.com/images/I/71cERjQgroL.jpg"
    },
    {
      "statement": "Senhora",
      "autor": "José de Alencar",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.",
      "imagem": "https://images-na.ssl-images-amazon.com/images/I/51zTZHr3KjL._SX340_BO1,204,203,200_.jpg"
    },
    {
      "statement": "Horto",
      "autor": "Auta de Souza",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.",
      "imagem":"https://m.media-amazon.com/images/I/51xAmTbNo+L.jpg"
    },
    {
      "statement": "Viagem ao céu",
      "autor": "Monteiro Lobato",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.",
      "imagem":"https://m.media-amazon.com/images/I/513FwESKwyL.jpg"
    }
]

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
