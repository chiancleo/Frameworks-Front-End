import React, { useContext } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

import AppContext from './AppContext'
import LivroForm from './LivroForm'


export default function Apostilas(){
    const {path, url} =useRouteMatch()
    const history = useHistory()
    const ctx = useContext(AppContext)


    const apostilas = ctx.apostilas.map((q, i) => (
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
            {apostilas}  
            <button className="addBtn" onClick={() => history.push(`${url}/add`)}>Adicionar nova Apostila</button>
          </Route>
          <Route exact path={`${path}/:id`}>
            <LivroForm />
          </Route>
        </Switch>
    )

}