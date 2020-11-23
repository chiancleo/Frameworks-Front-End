import React from 'react'

export default class Livro extends React.Component {
  render() { 
    return (
      <div>
        <img src={this.props.imagem} alt="Falha ao carregar" width={150} height={240}/>
        <h1>Livro: {this.props.statement}</h1>
        <h2>Autor: {this.props.autor}</h2>
        <h4>Descrição:</h4>
        <p className="paragrafo">{this.props.descricao}</p>
      </div>
    )
  }
}