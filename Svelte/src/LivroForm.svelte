<form on:submit|preventDefault={submit}>
	<h2>Novo Cadastro</h2>
	<Input label="Título" bind:value={book.statement} on:input={touched['statement']=true} on:blur={e=>
	checkField('statement')} placeholder="Digite o Título do livro" isRequired="true" error={errors['statement']} />
	<Input label="Autor" bind:value={book.autor} on:input={e=> touched['autor']=true} on:blur={e =>
	checkField('autor')} placeholder="Digite o nome do Autor" isRequired="true" error={errors['autor']} />
	<Input type="textarea" label="Descrição" bind:value={book.descricao} on:input={e=> touched['descricao']=true} on:blur={e =>
	checkField('descricao')} placeholder="Digite um breve resumo do livro" error={errors['descricao']} />
	<Input type="textarea" label="Link" bind:value={book.imagem} on:input={e=> touched['imagem']=true} on:blur={e =>
	checkField('imagem')} placeholder="Digite o link para download" isRequired="true" />
	<input type="submit" value="Cadastrar">
	<button type="button" on:click={e=> dispatch('cancel')}>Cancelar</button>
</form>

<script>
  import {requiredValidation} from './validations.js'
  import { createEventDispatcher } from 'svelte'
  import Input from './Input.svelte'

  export let livro
  const validate = {
    statement: requiredValidation,
    autor: requiredValidation,
    imagem: requiredValidation
  }
  let errors = {}
  let touched = {}
  const dispatch = createEventDispatcher()

  const { statement, autor, descricao, imagem } = livro || {}
  let book = { statement, autor, descricao, imagem}

  function checkField(name) {
    errors[name] = ''
    if (validate[name] && touched[name]) {
      const value = book[name]
      errors[name] = validate[name](value) || ''
    }
  }

  function submit() {
    Object.keys(book).forEach(field => {
      touched[field] = true
      checkField(field)
    })
    const errorsIsEmpty = !Object.values(errors).some(v => v)
    if (errorsIsEmpty) {
      dispatch('update', {
        statement: book.statement,
        autor: book.autor,
        descricao: book.descricao,
        imagem:book.imagem
      })
    }
  }
</script>