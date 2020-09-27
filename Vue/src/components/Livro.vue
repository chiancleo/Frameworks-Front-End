<template>
    <div class="classeLivro">
        <img :src=imagem alt="Falha ao carregar imagem" width=100 height=140/>
        <h1>{{statement}}</h1>
        <h2>{{autor}}</h2>
        <h4>Descrição:</h4>
        <p class="paragrafo">{{descricao}}</p>
    </div>
</template>
<script>
    export default {
  props: ['statement','imagem', 'autor', 'descricao']
}
</script>
<style>
.paragrafo{
font-family: Arial, Helvetica, sans-serif;
font-size: 14px;
}
.classeLivro {
  margin: 15px;
  padding: 50px;
  background-color:blanchedalmond;
}
</style>