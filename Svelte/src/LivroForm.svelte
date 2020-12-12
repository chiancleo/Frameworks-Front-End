<form on:submit|preventDefault={submit}>
	<h2>Cadastrar</h2>
	<Input label="Título" bind:value={book.statement} on:input={touched['statement']=true} on:blur={e=>
	checkField('statement')} placeholder="Digite o Título" isRequired="true" error={errors['statement']} />
	<Input label="Autor" bind:value={book.autor} on:input={e=> touched['autor']=true} on:blur={e =>
	checkField('autor')} placeholder="Digite o nome do Autor" isRequired="true" error={errors['autor']} />
	<Input type="textarea" label="Enredo" bind:value={book.descricao} placeholder="Digite um breve resumo do livro" />
	<Input type="textarea" label="Link" bind:value={book.imagem} on:input={e=> touched['imagem']=true} on:blur={e =>
	checkField('imagem')} placeholder="Digite o link para download" isRequired="true" error={errors['imagem']} />
	<input class="submitBtn" type="submit" value="Cadastrar">
	<button type="button" class="submitBtn" on:click={e=> dispatch('cancel')}>Cancelar</button>
</form>

<style>
      .submitBtn {
        background: #000;
        background-image: -webkit-linear-gradient(top, #a9a9a9, #808080);
        background-image: -moz-linear-gradient(top, #a9a9a9, #808080);
        background-image: -ms-linear-gradient(top, #a9a9a9, #808080);
        background-image: -o-linear-gradient(top, #a9a9a9, #808080);

        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 10px;
        color: #fff;
        font-family: Open Sans;
        font-size: 20px;
        font-weight: 100;
        padding: 10px;
        border: solid #808080 1px;
        text-decoration: none;
        cursor: pointer;
        text-align: center;
        margin-top: 5px;
        margin-left: 15px;
        margin-right: 5px;
        margin-bottom: 25px;
    }
    .submitBtn:hover {
        color: #fff;
        border: solid #a9a9a9 1px;
        -webkit-border-radius: 12px;
        -moz-border-radius: 12px;
        border-radius: 12px;
        text-decoration: none;
        font-weight: bolder;
    }
</style>

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