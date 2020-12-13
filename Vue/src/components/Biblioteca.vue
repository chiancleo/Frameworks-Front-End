<template>
    <div class="livroPanel">
        <Livro
        :statement="livro.statement"
        :imagem="livro.imagem"
        :autor="livro.autor"
        :descricao="livro.descricao"/>
        <button v-on:click="prev" class="submitBtn">Anterior</button>
        <button v-on:click="next" class="submitBtn">Próximo</button>
    </div>

</template>

<script>
import Livro from './Livro'

const livros = [
  {
    statement: 'Dom Casmurro',
    autor: 'Machado de Assis',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.',
    imagem: 'https://images-na.ssl-images-amazon.com/images/I/71cERjQgroL.jpg'
  },
  {
    statement: 'Senhora',
    autor: 'José de Alencar',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.',
    imagem: 'https://images-na.ssl-images-amazon.com/images/I/51zTZHr3KjL._SX340_BO1,204,203,200_.jpg'
  },
  {
    statement: 'Horto',
    autor: 'Auta de Souza',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.',
    imagem: 'https://m.media-amazon.com/images/I/51xAmTbNo+L.jpg'
  },
  {
    statement: 'Viagem ao céu',
    autor: 'Monteiro Lobato',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.',
    imagem: 'https://m.media-amazon.com/images/I/513FwESKwyL.jpg'
  }
]

export default {
  components: { Livro },
  data: () => ({
    current: 0
  }),
  methods: {
    next () {
      if (this.current < this.livros.length - 1) {
        this.current++
      } else {
        this.current = 0
      }
    },
    prev () {
      if (this.current !== 0) {
        this.current--
      } else {
        this.current = this.livros.length - 1
      }
    }
  },
  computed: {
    livros () {
      return livros
    },
    livro () {
      return livros[this.current]
    }
  }
}
</script>
<style>
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
