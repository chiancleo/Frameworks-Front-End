import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template:`
    <header >
    <img class="banner" src="./assets/banner.jpg"alt="Falha ao carregar"/>
    </header>
    <div class="principal">
      <h1 style="padding-left: 15px">Quem somos</h1>
      <p>
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
          <img class="imagem" src="./assets/category.jpeg" alt="Falha ao carregar" />
          <h3>Livros</h3>
        </div>
        <div class="category">
        <img class="imagem" src="./assets/ebook.png" alt="Falha ao carregar" />
          <h3>E-books</h3>
        </div>
        <div class="category">
        <img class="imagem" src="./assets/apostila.jpg" alt="Falha ao carregar"/>
          <h3>Apostilas</h3>
        </div>
      </div>

      <div>
        <div class="panel">
        <h1>Livros</h1>
        <biblioteca></biblioteca>
        </div>
        <div class="panel">
          <h1>E-books</h1>
          <Ebook-list></Ebook-list>
        </div>
        <div class="panel">
          <h1>Apostilas</h1>
          <Apostilas></Apostilas>
        </div>
      </div>


    </div>
  `
})
export class AppComponent {}








