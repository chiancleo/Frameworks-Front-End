<template>
    <div class="livroPanel">


        <Livro
        :statement="livro.statement"
        :imagem="livro.imagem"
        :autor="livro.autor"
        :descricao="livro.descricao"
        />
        
        <button v-on:click="next" class="submitBtn">Próximo</button>
        <button v-on:click="prev" class="submitBtn">Anterior</button>
        
    </div>

</template>

<script>
import Livro from './Livro'

const livros = [
    {
      statement: 'Dom Casmurro',
      imagem: "casmurro.jpg",
      autor: 'Machado de Assis',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.'
    },
    {
      statement: 'Senhora',
      imagem: "senhora.jpg",
      autor: 'José de Alencar',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.'
    },
    {
      statement: 'Horto',
      imagem: "horto.jpg",
      autor: 'Auta de Souza',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.'
    },
    {
      statement: 'Viagem ao céu',
      imagem: "viagem.png",
      autor: 'Monteiro Lobato',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.'
    }
  ]

export default {
  components: {Livro},
  data: () => ({
    current: 0,
  }),
  methods: {
    next() {
      if (this.current < this.livros.length - 1) {
        this.current++
      } else {
        this.current = 0
      }
    },
    prev(){
        if(this.current != 0){
            this.current--
        }else{
            this.current = this.livros.length - 1
        }
    }
  },
  computed: {
    livros() {
      return livros 
    },
    livro() {
      return livros[this.current] 
    }
  }
}
</script>


<style>
.submitBtn {
  margin: 15px;
  float: right;
}
body {
  font-family: sans-serif;
}

.livroPanel {
  background-color:darkturquoise;
  padding: 50px;
}

</style>