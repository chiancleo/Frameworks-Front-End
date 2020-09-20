import React from 'react'

export default class Livro extends React.Component {
  render() { 
    return (
      <div>
        <img src={this.props.imagem} alt="Falha ao carregar" width={60} height={40}/>
        <h1>{this.props.statement}</h1>
        <h3>{this.props.autor}</h3>
        <p>{this.props.descricao}</p>
      </div>
    )
  }
}