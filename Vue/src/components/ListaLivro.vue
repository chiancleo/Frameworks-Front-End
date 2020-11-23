<template>
  <div v-if="mode === 'view'">
    <p v-for="(livro, i) in livros" :key="i">
        <b>Título: </b>{{livro.statement}}
        <br />
        <b>Autor: </b>{{livro.autor}}
        <br />
        <b>Link para Download: </b>
        <a href="{{livro.imagem}}" target="_blank">{{livro.imagem}} </a>
    </p>
    <button @click="addLivro">Adicionar Novo</button>
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
