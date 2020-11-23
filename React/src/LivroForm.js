import React from 'react'
import Input from './forms/Input'
import {requiredValidation} from './forms/validations'


const validate = {
    statement: requiredValidation,
    autor: requiredValidation,
    descricao: requiredValidation,
    imagem: requiredValidation
  }

export default class LivroForm extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        livro: {  
            statement: props.livro.statement || '', //titulo do livro
            autor:  props.livro.autor || '',
            descricao: props.livro.descricao || '',
            imagem: props.livro.imagem || ''
        },
        errors: {},
        touched: {}
      }
      this.onChange = this.onChange.bind(this)
      this.onBlur = this.onBlur.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
      this.onCancel = this.onCancel.bind(this)
    }

    onChange(event) {
        const { name, value } = event.target
        this.setState((state) => ({
          ...state,
          livro: { ...state.livro, [name]: value },
          touched: { ...state.touched, [name]: true }
        }))
    }

    onBlur(event) {
        const { name, value } = event.target
        const { [name]: removedError, ...rest } = this.state.errors
        const error = validate[name] ? validate[name](value) : null
        const nameError = this.state.touched[name] ? error : null
    
        this.setState((state) => ({
          ...state,
          errors: {
            ...rest,
            [name]: nameError
          }
        }))
    }
    
    onSubmit(event) {
        event.preventDefault()
        const livro = this.state.livro

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
        this.setState((state) => ({
          ...state,
          errors: validation.errors,
          touched: validation.touched
        }))
    
        const errorValues = Object.values(validation.errors)
        const touchedValues = Object.values(validation.touched)
        const errorsIsEmpty = errorValues.length === 0
        const touchedAll = touchedValues.length === Object.values(livro).length
        const allTrue = touchedValues.every((t) => t === true)
        if (errorsIsEmpty && touchedAll && allTrue) {
          this.props.onUpdate({
            statement: livro.statement,
            autor:livro.autor,
            descricao:livro.descricao,
            imagem:livro.imagem
          })
        }
        console.log(this.state)
    }

    onCancel(event) {
      this.props.onCancel()
    }

    render() {
        const commonProps = {
          values: this.state.livro,
          errors: this.state.errors,
          touched: this.state.touched,
          onChange: this.onChange,
          onBlur: this.onBlur
        }
        return (
          <form onSubmit={this.onSubmit}>
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
            <input type="submit" value="Cadastrar" />
            <button onClick={this.onCancel}>Cancelar</button>
          </form>
        )
    }
}

