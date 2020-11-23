import React from 'react'
import Biblioteca from './Biblioteca'
import ListaLivro from './ListaLivro'
import livros from './livros.json'
import './index.css'
import LivroForm from './LivroForm'



export default function App() {
  return (
    <div className="principal">
      <header>
        <h1>Biblioteca Virtual</h1>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Praesent sodales felis nec lacinia dapibus. 
        Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. 
        Donec sit amet justo eu dolor varius consequat sit amet non felis. 
        Cras luctus convallis blandit. Donec eget iaculis ipsum. 
        Phasellus ligula neque, convallis in dictum ac, cursus non neque. 
        Integer sit amet convallis turpis, in fringilla tortor. 
        Curabitur interdum neque sed volutpat vestibulum. 
        Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. 
        Proin fringilla id felis sed egestas. 
        Aliquam molestie sit amet orci ac consequat.
        </p>
        <div className="container">
          <div className="category">
            <img className="imagem" src={"https://www.estudarfora.org.br/app/uploads/2013/10/20131029_livros_115791277-768x334.jpg"} alt="Falha ao carregar" width={150} height={40}/>
            <h3>Livros</h3>
            
          </div>
          <div className="category">
          <img className="imagem" src={"https://www.estudarfora.org.br/app/uploads/2013/10/20131029_livros_115791277-768x334.jpg"} alt="Falha ao carregar" width={150} height={40}/>
            <h3>E-books</h3>
          </div>
          <div className="category">
          <img className="imagem" src={"https://www.estudarfora.org.br/app/uploads/2013/10/20131029_livros_115791277-768x334.jpg"} alt="Falha ao carregar" width={150} height={40}/>
            <h3>Cadastro</h3>
          </div>
        </div>
      </header>
      <div>
        <div className="panel">
          <Biblioteca livros={livros}/>
        </div>
        <div className="panel">
          <h1>Cadastro (Em manutenção)</h1>         
        </div>
        <div className="panel">
          <h1>E-books</h1>
          <ListaLivro livros={livros}/>
        </div>
      </div>
    </div>
  )
}