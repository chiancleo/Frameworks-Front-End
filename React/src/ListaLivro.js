import React from 'react'
import LivroForm from './LivroForm'

export default class ListaLivro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      livros: props.livros,
      mode: 'view',
      current: null
    }
  }

  render() {
    if (this.state.mode === 'view') {
      const livros = this.state.livros.map((q, i) => (
        <p key={i}>
          <b>Título: </b>
          {q.statement}
          <br />
          <b>Autor: </b>
          {q.autor}
          <br />
          <b>Download: </b>
          <a href={q.imagem} target="_blank">{q.imagem} </a> 
        </p>
      ))
      return (
        <>
          {livros}
          <button onClick={() => this.addLivro()}>Adicionar Novo</button>
        </>
      )
    } else {
      return (
        <LivroForm
          livro={this.state.livros[this.state.current]}
          onUpdate={(livro) => this.updateChanges(livro)}
          onCancel={() => this.cancelChanges()}
        />
      )
    }
  }

  addLivro() {
    const newLivro = { statement: '', autor: '', descricao: '', imagem:'' }
    const livros = [...this.state.livros, newLivro]
    this.setState({
      livros,
      mode: 'add',
      current: livros.length - 1
    })
  }

  removeLivro(index) {
    const livros = [...this.state.livros]
    livros.splice(index, 1)
    console.log(livros.splice(index, 1))
    this.setState({ livros })
  }

  updateChanges(livro) {
    const livros = [...this.state.livros]
    livros[this.state.current] = { ...livro }
    this.setState({ mode: 'view', livros })
  }

  cancelChanges() {
    if (this.state.mode === 'add') {
      this.removeLivro(this.state.livros.length - 1)
      console.log(this.state.livros.length - 1)
    }
    this.setState({ mode: 'view' })
  }
}
