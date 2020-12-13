<template>
  <header>
    <img className="banner" src="./assets/banner.jpg" alt="Falha ao carregar"/>
  </header>
  <body>
    <div class="principal">
        <h1 style="padding-left: 15px">Quem somos</h1>
        <p style="text-indent: 40px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Praesent sodales felis nec lacinia dapibus.
        Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed.
        Donec sit amet justo eu dolor varius consequat sit amet non felis.
        Cras luctus convallis blandit. Donec eget iaculis ipsum.
        Phasellus ligula neque, convallis in dictum ac, cursus non neque.
        Integer sit amet convallis turpis, in fringilla tortor.
        Curabitur interdum neque sed volutpat vestibulum.
        Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor.
        Proin fringilla id felis sed egestas.
        Aliquam molestie sit amet orci ac consequat.
        </p>
        <div class="container">
          <div class="category">
            <img class="imagem" src="./assets/category.jpeg" alt="Falha ao carregar" width={150} height={40}/>
            <h3>Livros</h3>
          </div>
          <div class="category">
          <img class="imagem" src="./assets/ebook.png" alt="Falha ao carregar" width={150} height={40}/>
            <h3>E-books</h3>
          </div>
          <div class="category">
          <img class="imagem" src="./assets/apostila.jpg" alt="Falha ao carregar" width={150} height={40}/>
            <h3>Apostilas</h3>
          </div>
        </div>
      <div>
        <div class="panel">
          <h1>Livros</h1>
          <Biblioteca/>
        </div>
        <div class="panel">
          <h1>E-books</h1>
          <EbookList/>
        </div>
        <div class="panel">
          <h1>Apostilas (em desenvolvimento)</h1>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import Biblioteca from './components/Biblioteca.vue'
// import ListaLivro from './components/ListaLivro.vue'
import EbookList from './components/EbookList.vue'

export default {
  name: 'App',
  components: {
    Biblioteca,
    EbookList
  }
}
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  background-image: url(https://i.pinimg.com/originals/c4/d1/e0/c4d1e083acbdb201927e50b2486283b1.png);
  opacity: 0.95;
}

p{
  font-size: 20px;
  text-align: justify;
  padding-left: 15px;
  padding-right: 15px;
  font-family: serif;
}

Input[type=text]{
  width: 300px;
}

.banner{
  width: 100%;
  vertical-align: middle;

}

.principal{
  font-size: 22px;
  background-color: #FFFFFF;
  margin: 5px 150px;
}

.container{
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
  margin-bottom: 30px;
}

.category {
  width: 25%;
  margin: 30px 1.53333%;
  border: 5px solid #fff;
  background: #fff;
  line-height: 35px;
  box-shadow: 0 10px 20px #999;
  display: inline-block;
}

.imagem {
  width: 100%;
  height: 150px;
  background: black;
}

.panel {
  background-color: #C0C0C0;
  padding: 10px;
  border: 5px solid #fff;
  opacity: 1.0;
}

.ebooks{
text-indent: 0px;
text-align: left;
padding-left: 0px;
}
</style>
