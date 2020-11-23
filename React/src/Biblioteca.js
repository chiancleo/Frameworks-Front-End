import React from 'react'
import Livro from './Livro.js'
import livros from './livros.json'

export default class Biblioteca extends React.Component {

  livros = livros

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
          <button className="submitBtn" onClick={e => this.prev(e)}>Voltar</button>
          <button className="submitBtn" onClick={e => this.next(e)}>Próximo</button>          
        </div>
      )
  }

next() {
    this.setState((state) => {
      return state.current < this.livros.length - 1
        ? { current: state.current + 1 }
        : { current: state.current = 0 }
    })
  }

prev() {
    this.setState((state) => {
      return state.current !== 0
        ? { current: state.current - 1}
        : { current: state.current = this.livros.length -1}
    })
  }
}