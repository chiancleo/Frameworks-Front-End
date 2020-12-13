<template>
    <div class="classeLivro">
        <img :src="imagem" :alt="imagem" width=150 height=240>
        <h1>{{statement}}</h1>
        <h2>{{autor}}</h2>
        <h4>Descrição:</h4>
        <p style="text-indent: 40px" >{{descricao}}</p>
    </div>
</template>
<script>
export default {
  props: ['statement', 'imagem', 'autor', 'descricao']
}
</script>
<style>
.classeLivro {
  padding: 15px;
  position: relative;
  background-color: #C0C0C0;
}
</style>
