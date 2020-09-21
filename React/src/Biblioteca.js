import React from 'react'
import Livro from './Livro.js'
import viagem from './viagem.png'
import casmurro from './casmurro.jpg'
import senhora from './senhora.jpg'
import horto from './horto.jpg'

export default class Biblioteca extends React.Component {
  livros = [
    {
      statement: 'Dom Casmurro',
      autor: 'Machado de Assis',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.',
      imagem: casmurro
    },
    {
      statement: 'Senhora',
      autor: 'José de Alencar',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.',
      imagem: senhora
    },
    {
      statement: 'Horto',
      autor: 'Auta de Souza',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.',
      imagem:horto
    },
    {
      statement: 'Viagem ao céu',
      autor: 'Monteiro Lobato',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.',
      imagem:viagem
    }
  ]

  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
  }

  render() {
      let panel = (
        <div className="classeLivro">
        <Livro
          statement={this.livros[this.state.current].statement}
          autor={this.livros[this.state.current].autor}
          descricao = {this.livros[this.state.current].descricao}
          imagem = {this.livros[this.state.current].imagem}
        />
      </div>
      )
      return (
        <div>
          {panel}
          <button className="submitBtn" onClick={e => this.next(e)}>Próximo</button>
          <button className="submitBtn" onClick={e => this.prev(e)}>Anterior</button>
        </div>
      )
  }

next() {
    this.setState((state) => {
      return state.current < this.livros.length - 1
        ? { current: state.current + 1 }
        : { current: state.current = -1 }
    })
  }

prev() {
    this.setState((state) => {
      return state.current != 0
        ? { current: state.current - 1}
        : { current: state.current = this.livros.length}
    })
  }
}