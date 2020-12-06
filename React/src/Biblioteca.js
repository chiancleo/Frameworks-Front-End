import React, { useState, useContext } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

import AppContext from './AppContext'

import Livro from './Livro.js'
import LivroForm from './LivroForm'



export default function Biblioteca (){

  const ctx = useContext(AppContext)
  const { path, url } = useRouteMatch()
  const history = useHistory()
  const [current, setCurrent] = useState(0)
  const [mode, setMode] = useState('view')

  function next() {
    if (current < ctx.livros.length - 1) {
      setCurrent(current + 1)
    } else {
      setCurrent(0)
    }
  }

  function prev() {
    if (current !== 0) {
      setCurrent(current - 1)
    } else {
      setCurrent(ctx.livros.length - 1)
    }
  }

  const removeLivro = (index) =>{
    ctx.deleteLivro(index)
  }

  const updateChanges = (livro) => {
    ctx.updateLivro(livro,current)
    setMode('view')
  }

  const cancelChanges = () => {
    removeLivro(ctx.livros.length - 1)
    setMode('view')
  }

  let panel, btnNext, btnPrev, btnAdd

    panel = (
      <div>
        <Livro
          statement={ctx.livros[current].statement}
          autor={ctx.livros[current].autor}
          descricao = {ctx.livros[current].descricao}
          imagem = {ctx.livros[current].imagem}
        />
      </div>
    )

    btnNext = (
      <button className="submitBtn" onClick={next}>
        Próximo
      </button>
    )

    btnPrev = (
      <button className="submitBtn" onClick={prev}>
        Anterior
      </button>
    )

    btnAdd = (
      <button className="submitBtn" onClick={() => history.push(`${url}/add`)}>
        Adicionar Novo
      </button>
    )


  return (
    <Switch>
      <Route exact path={path}>
        <div>
          {panel}
          {btnPrev}
          {btnNext}
          {btnAdd}
        </div>
      </Route>
      <Route exact path={`${path}/:id`}>
        <LivroForm
          livro = {ctx.livros[current]}
          onUpdate={(livro) => updateChanges(livro)}
          oncancel = {() => cancelChanges()}
        />
      </Route>
    </Switch>
  )
  



}
