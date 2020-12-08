import React, { useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import AppContext from './AppContext'

import Input from './forms/Input'
import {requiredValidation} from './forms/validations'


const validate = {
  statement: requiredValidation,
  autor: requiredValidation,
  descricao: requiredValidation,
  imagem: requiredValidation
}

export default function LivroForm(props){
  const history = useHistory()
  const ctx = useContext(AppContext)
  const{id} = useParams()

  let initialData = {
    statement: '',
    autor: '',
    descricao: '',
    imagem: ''
  }

  if (id !== 'add') {
    const index = parseInt(id, 10)
    initialData = {
      statement: ctx.livros[index].statement || '',
      autor: ctx.livros[index].autor || '',
      descricao: ctx.livros[index].descricao || '',
      imagem: ctx.livros[index].imagem || ''
    }
  }

  const [livro, setLivro] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  function onChange(event) {
    const { name, value } = event.target
    setLivro({ ...livro, [name]: value })
    setTouched({ ...touched, [name]: true })
  }


  function onBlur(event) {
    const { name, value } = event.target
    const { [name]: removedError, ...rest } = errors
    const error = validate[name] ? validate[name](value) : null
    const nameError = touched[name] ? error : null
    setErrors({
      ...rest,
      [name]: nameError
    })
  }
    
  function onSubmit(event) {
    event.preventDefault()

    const validation = Object.keys(livro).reduce((acc, key) => {
      const error = validate[key] && validate[key](livro[key])
      return {
        errors: {
          ...acc.errors,
          ...(error && { [key]: error })
        },
        touched: {
          ...acc.touched,
          ...{ [key]: true }
        }
      }
    }, {})
    setErrors(validation.errors)
    setTouched(validation.touched)

    const errorValues = Object.values(validation.errors)
    const touchedValues = Object.values(validation.touched)
    const errorsIsEmpty = errorValues.length === 0
    const touchedAll = touchedValues.length === Object.values(livro).length
    const allTrue = touchedValues.every((t) => t === true)

    if (errorsIsEmpty && touchedAll && allTrue) {
      ctx.updateLivro(
        {
          statement: livro.statement,
          autor: livro.autor,
          descricao: livro.descricao,
          imagem: livro.imagem
        },
        ctx.livros.length
      )
      history.goBack()
    }
  }

  function onCancel(event) {
    history.goBack()
  }


  const commonProps = {
    values: livro,
    errors: errors,
    touched: touched,
    onChange: onChange,
    onBlur: onBlur
  }
  return (
    <form onSubmit={onSubmit}>
      <h2>Adicionar</h2>
      <Input
        label="Título"
        name="statement"
        placeholder="Digite o título do livro"
        isRequired={true}
        {...commonProps}
      />
      <Input
        label="Autor(a)"
        name="autor"
        placeholder="Digite o nome do(a) autor(a) do livro"
        isRequired={true}
        {...commonProps}
      />
      <Input
        type="textarea"  
        label="Descrição"
        name="descricao"
        placeholder="Digite uma breve descrição da obra"
        isRequired={true}
        {...commonProps}
      />
      <Input
        type="textarea"  
        label="Link"
        name="imagem"
        placeholder="Insira o link da imagem do livro ou da página para download do e-book"
        isRequired={true}
        {...commonProps}
      />
      <input className="submitBtn" style={{marginLeft:0}} type="submit" value="Cadastrar" />
      <button className="submitBtn" style={{marginLeft:0}} onClick={onCancel}>Cancelar</button>
    </form>
  )

}

