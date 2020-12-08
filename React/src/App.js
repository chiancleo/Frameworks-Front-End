import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import AppContext from './AppContext'
import useBookData from './livros-hook'


import Biblioteca from './Biblioteca'
import EbookList from './ebooks'
//import LivroForm from './LivroForm'

import './index.css'
import category_livro from './img/category.jpeg'
import category_ebook from './img/ebook.png'
import category_apost from './img/apostila.jpg'
import banner from './img/banner.jpg'



export default function App() {
  const data = useBookData()

  return (

    <div>
      <header >
        <img className="banner" src={banner} alt="Falha ao carregar"/>
      
      </header>
      <AppContext.Provider value={data}>
        <BrowserRouter>
          <div className="principal">
            <h1 style={{padding:15}}>Quem Somos</h1>
            <p style={{textIndent:40}}>
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
            <p style={{textIndent:40}}>
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
                <img className="imagem" src={category_livro} alt="Falha ao carregar" width={150} height={40}/>              
                <Link to="/livros">
                  <h3>Livros</h3>
                </Link>                            
              </div>
              <div className="category">
                <img className="imagem" src={category_ebook} alt="Falha ao carregar" width={150} height={40}/>
                  <Link to="/ebooks">
                    <h3>E-books</h3>
                  </Link>
              </div>
              <div className="category">
                <img className="imagem" src={category_apost} alt="Falha ao carregar" width={150} height={40}/>
                <Link to="/apostilas">
                  <h3>Apostilas</h3>
                </Link>
              </div>
            </div>
            <div className="panel">
              <Switch>
                <Route path="/livros">
                  <h1>Livros</h1>
                  <Biblioteca />                
                </Route>
                <Route path="/ebooks">
                  <h1>E-books</h1>
                  <EbookList />
                </Route>
                <Route path="/apostilas">
                  <h1>Apostilas</h1>
                  <EbookList />
                </Route>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </AppContext.Provider>

    </div>


  )
}
