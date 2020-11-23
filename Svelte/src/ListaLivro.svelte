{#if mode === 'view'}

{#each livros as livro, index}
<p>
	<b>Título: </b> { livro.statement }
	<br />
    <b>Autor: </b>{livro.autor}
    <br/>
    <b>Donwload: </b><a href={livro.imagem} target="_blank">{livro.imagem} </a> 
</p>
{/each}
<button on:click={addLivro}>Cadastrar Novo</button>
{:else}
<LivroForm livro={livros[current]} on:update={updateChanges} on:cancel={cancelChanges} />
{/if}


<script>
  import LivroForm from './LivroForm.svelte'

  let mode = 'view'
  let current = null
  let livros = []

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