<template>
  <form @submit.prevent="onSubmit">
    <h2>Cadastrar</h2>
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
    <input class="submitBtn" type="submit" value="Cadastrar" />
    <button class="submitBtn" @click="$emit('cancel')" type="button">Cancelar</button>
  </form>
</template>

<script>
import Input from './Input.vue'
import { requiredValidation } from './validations'

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
  .submitBtn {
  background: #000;
  background-image: -webkit-linear-gradient(top, #A9A9A9, #808080);
  background-image: -moz-linear-gradient(top, #A9A9A9, #808080);
  background-image: -ms-linear-gradient(top, #A9A9A9, #808080);
  background-image: -o-linear-gradient(top, #A9A9A9, #808080);

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
  .submitBtn:hover{
  color: #FFF;
  border: solid #A9A9A9 1px;
  -webkit-border-radius: 12px;
  -moz-border-radius: 12px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: bolder;
    }
</style>
