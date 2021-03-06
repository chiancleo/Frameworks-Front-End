import React, { useContext } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

import AppContext from './AppContext'
import LivroForm from './LivroForm'


export default function EbookList(){
    const {path, url} =useRouteMatch()
    const history = useHistory()
    const ctx = useContext(AppContext)


    const ebooks = ctx.ebooks.map((q, i) => (
        <p className="ebooks" key={i}>
          <b>Título: </b>
          {q.statement}
          <br />
          <b>Autor: </b>
          {q.autor}
          <br />
          <b>Download: </b>
          <a href={q.imagem} target="_blank">Baixar {q.statement} </a> 
        </p>
    ))

    return (
        <Switch>
          <Route exact path={path}>
            {ebooks}  
            <button className="addBtn" onClick={() => history.push(`${url}/add`)}>Adicionar Novo E-book</button>
          </Route>
          <Route exact path={`${path}/:id`}>
            <LivroForm />
          </Route>
        </Switch>
    )

}