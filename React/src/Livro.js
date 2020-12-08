import React from 'react'

export default class Livro extends React.Component {
  render() { 
    return (
      <div>
        <img src={this.props.imagem} alt="Falha ao carregar" width={150} height={240}/>
        <h2>Título: {this.props.statement}</h2>
        <h3>Autor: {this.props.autor}</h3>
        <h4>Enredo:</h4>
        <p>{this.props.descricao}</p>
      </div>
    )
  }
}