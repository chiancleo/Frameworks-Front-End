<template>
  <div v-if="mode === 'view'">
    <p v-for="(livro, i) in livros" :key="i">
        <b>Título: </b>{{livro.statement}}
        <br />
        <b>Autor: </b>{{livro.autor}}
        <br />
        <b>Link para Download: </b>
        <a href= {{livro.imagem}} livro.imagem target="_blank">Baixar {{livro.statement}} </a>
    </p>
    <button class="addBtn" @click="addLivro">Adicionar Novo</button>
  </div>
  <div v-else>
    <LivroForm
      :livro="livros[current]"
      @update="updateChanges"
      @cancel="cancelChanges"
    />
  </div>
</template>

<script>
import LivroForm from './LivroForm'
import { ref } from 'vue'

import {
  livros,
  size,
  createLivro,
  updateLivro,
  deleteLivro
} from './livros'

export default {
  components: { LivroForm },
  setup () {
    const mode = ref('view')
    const current = ref(0)

    const addLivro = () => {
      createLivro()
      mode.value = 'add'
      current.value = size.value - 1
    }

    const updateChanges = (Livro) => {
      updateLivro(Livro, current.value)
      mode.value = 'view'
    }

    const removeLivro = (index) => {
      deleteLivro(index)
    }

    const cancelChanges = () => {
      if (mode.value === 'add') {
        deleteLivro(size.value - 1)
      }
      mode.value = 'view'
    }

    return {
      mode,
      livros,
      current,
      addLivro,
      updateChanges,
      removeLivro,
      cancelChanges
    }
  }
}
</script>
<style>
  .addBtn {
  background: #000;
  background-image: -webkit-linear-gradient(top, #A9A9A9, #808080);
  background-image: -moz-linear-gradient(top, #A9A9A9, #808080);
  background-image: -ms-linear-gradient(top, #A9A9A9, #808080);
  background-image: -o-linear-gradient(top, #A9A9A9, #808080);

  border-radius: 5px;
  color: #fff;
  font-family: Open Sans;
  font-size: 26px;
  font-weight: 100;
  width: 100%;
  padding: 10px;
  border: solid #808080 1px;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 25px;
}
.addBtn:hover{
  color: #FFF;
  border: solid #A9A9A9 1px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 7px;
  text-decoration: none;
  font-weight: bolder;
}

</style>
