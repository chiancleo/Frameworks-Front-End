import React from 'react'
import Livro from './Livro.js'

export default class Biblioteca extends React.Component {
  livros = [
    {
      statement: 'Dom Casmurro',
      autor: 'Machado de Assis',
      descricao: 'Aqui conterá uma descrição da obra',
      imagem: './viagem.png'
    },
    {
      statement: 'Senhora',
      autor: 'José de Alencar',
      descricao: 'Aqui conterá uma descrição da obra',
      imagem: './viagem.png'
    },
    {
      statement: 'Horto',
      autor: 'Auta de Souza',
      descricao: 'Aqui conterá uma descrição da obra',
      imagem:'./viagem.png'
    },
    {
      statement: 'Viagem ao céu',
      autor: 'Monteiro Lobato',
      descricao: 'Aqui conterá uma descrição da obra',
      imagem:'./viagem.png'
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