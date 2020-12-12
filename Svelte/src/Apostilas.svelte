{#if mode === 'view'}

{#each livros as livro, index}
<div class="ebooks">
  <p>
    <b>Título: </b> { livro.statement }
    <br />
      <b>Autor: </b>{livro.autor}
      <br/>
      <b>Donwload: </b><a href={livro.imagem} target="_blank">{livro.imagem} </a> 
  </p>
</div>
{/each}
<button class="addBtn" on:click={addLivro}>Cadastrar Novo</button>
{:else}
<LivroForm livro={livros[current]} on:update={updateChanges} on:cancel={cancelChanges} />
{/if}

<style>
  .addBtn {
    background: #000;
    background-image: -webkit-linear-gradient(top, #a9a9a9, #808080);
    background-image: -moz-linear-gradient(top, #a9a9a9, #808080);
    background-image: -ms-linear-gradient(top, #a9a9a9, #808080);
    background-image: -o-linear-gradient(top, #a9a9a9, #808080);

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
  .addBtn:hover {
        color: #fff;
        border: solid #a9a9a9 1px;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 7px;
        text-decoration: none;
        font-weight: bolder;
  }

  .ebooks {
        text-indent: 0px;
        text-align: left;
        padding-left: 0px;
    }
</style>
<script>
  import LivroForm from './LivroForm.svelte'

  let mode = 'view'
  let current = null
  let livros = [    
    {
      "statement": "Dom Casmurro",
      "autor": "Machado de Assis",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.",
      "imagem": "https://images-na.ssl-images-amazon.com/images/I/71cERjQgroL.jpg"
    },
    {
      "statement": "Senhora",
      "autor": "José de Alencar",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.",
      "imagem": "https://images-na.ssl-images-amazon.com/images/I/51zTZHr3KjL._SX340_BO1,204,203,200_.jpg"
    },
    {
      "statement": "Horto",
      "autor": "Auta de Souza",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.",
      "imagem":"https://m.media-amazon.com/images/I/51xAmTbNo+L.jpg"
    },
    {
      "statement": "Viagem ao céu",
      "autor": "Monteiro Lobato",
      "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat.",
      "imagem":"https://m.media-amazon.com/images/I/513FwESKwyL.jpg"
    }
  ]

  function addLivro() {
    mode = 'add'
    livros = [...livros, {}]
    current = livros.length - 1
  }

  function removeLivro(index) {
    livros = [
      ...livros.slice(0, index),
      ...livros.slice(index + 1)
    ]
  }

  function updateChanges({ detail }) {
    livros[current] = detail
    mode = 'view'
  }

  function cancelChanges() {
    if (mode === 'add') {
      removeLivro(livros.length - 1)
    }
    mode = 'view'
  }
</script>