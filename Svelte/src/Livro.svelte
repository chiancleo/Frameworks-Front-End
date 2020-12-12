<img src={imagem} alt="Falha ao carregar" width={100} height={140}/>
<h2>{ statement }</h2>
<h3>{ autor }</h3>
<h4>{ header }</h4>
<p>{ descricao }</p>

<style>
  p {
    font-size: 20px;
    text-align: justify;
    padding-left: 15px;
    padding-right: 15px;
    font-family: serif;
    text-indent: 40px
  }
</style>

<script>
  let header = "Descrição";
  export let statement;
  export let autor;
  export let descricao;
  export let imagem;
</script>