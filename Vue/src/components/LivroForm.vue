<template>
  <form @submit.prevent="onSubmit">
    <h2>Cadastrar E-books</h2>
    <Input
      label="Título"
      v-model="book.statement"
      placeholder="Digite o título do livro"
      isRequired="true"
      :error="errors['statement']"
      @input="touched['statement'] = true"
      @blur="checkField('statement')"
    />
    <Input
      label="Autor"
      v-model="book.autor"
      placeholder="Digite o autor do livro"
      isRequired="true"
      :error="errors['autor']"
      @input="touched['autor'] = true"
      @blur="checkField('autor')"
    />
    <Input
      type="textarea"
      label="Descrição"
      v-model="book.descricao"
      placeholder="Digite a descrição da obra"
      :error="errors['descricao']"
      @input="touched['descricao'] = true"
      @blur="checkField('descricao')"
    />
    <Input
      type="textarea"
      label="Link"
      v-model="book.imagem"
      placeholder="Inserir link para download"
      isRequired="true"
      :error="errors['imagem']"
      @input="touched['imagem'] = true"
      @blur="checkField('imagem')"
    />
    <input type="submit" value="Cadastrar" />
    <button @click="$emit('cancel')" type="button">Cancelar</button>
  </form>
</template>

<script>
import Input from './Input.vue'
import requiredValidation from './validations'

const validate = {
  statement: requiredValidation,
  imagem: requiredValidation,
  autor: requiredValidation
}

export default {
  components: { Input },
  props: ['livro'],
  data () {
    const { statement, imagem, autor, descricao } = this.livro || {}
    return {
      book: { statement, imagem, autor, descricao },
      errors: {},
      touched: {}
    }
  },
  methods: {
    checkField (name) {
      const value = this.book[name]
      const error = validate[name] ? validate[name](value) : null
      const nameError = this.touched[name] ? error : null
      this.errors[name] = nameError
    },
    onSubmit () {
      Object.keys(this.book).forEach((field) => {
        this.touched[field] = true
        this.checkField(field)
      })
      const errorsIsEmpty = !Object.values(this.errors).some((v) => v)
      console.log(errorsIsEmpty)
      if (errorsIsEmpty) {
        this.$emit('update', {
          statement: this.book.statement,
          imagem: this.book.imagem,
          autor: this.book.autor,
          descricao: this.book.descricao
        })
      }
    }
  }
}
</script>

<style scoped>
.form-item {
  display: flex;
  margin-bottom: 1.7rem;
}
</style>
