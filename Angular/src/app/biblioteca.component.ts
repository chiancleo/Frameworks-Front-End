import { Component } from "@angular/core";

@Component({
  selector: "biblioteca",
  template: `<div class="livroPanel">
    <livro
      [statement]="livros[current].statement"
      [autor]="livros[current].autor"
      [descricao]="livros[current].descricao"
      [imagem]="livros[current].imagem"
    >
    </livro>
    <button class="submitBtn" (click)="prev()">Anterior</button>
    <button class="submitBtn" (click)="next()">Próximo</button>    
  </div>`
})
export class BibliotecaComponent {
  livros = [
    {
      statement: "Dom Casmurro",
      autor: "Machado de Assis",
      imagem: "https://livralivro.com.br/uploads/book/img/759/8525406759.jpg",
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat."
    },
    {
      statement: "Senhora",
      autor: "José de Alencar",
      imagem: "https://livralivro.com.br/uploads/book/img/759/8525406759.jpg",
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat."
    },
    {
      statement: "Horto",
      autor: "Auta de Souza",
      imagem: "https://livralivro.com.br/uploads/book/img/759/8525406759.jpg",
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat."
    },
    {
      statement: "Viagem ao céu",
      autor: "Monteiro Lobato",
      imagem: "https://livralivro.com.br/uploads/book/img/759/8525406759.jpg",
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat."
    }
  ];
  current = 0;

  next() {
    if (this.current < this.livros.length - 1) {
      this.current++;
    } else {
      this.current = 0;
    }
  }
  prev() {
    if (this.current !== 0) {
      this.current--;
    } else {
      this.current = this.livros.length - 1;
    }
  }
}
