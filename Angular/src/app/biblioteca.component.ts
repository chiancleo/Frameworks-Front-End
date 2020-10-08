import { Component } from "@angular/core";

@Component({
  selector: "biblioteca",
  template: ` <livro
      [statement]="livros[current].statement"
      [autor]="livros[current].autor"
      [descricao]="livros[current].descricao"
    >
    </livro>
    <button (click)="next()">Anterior</button>
    <button (click)="next()">Próximo</button>`
})
export class BibliotecaComponent {
  livros = [
    {
      statement: "Dom Casmurro",
      autor: "Machado de Assis",
      imagem: "./viagem.png",
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat."
    },
    {
      statement: "Senhora",
      autor: "José de Alencar",
      imagem: "./viagem.png",
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat."
    },
    {
      statement: "Horto",
      autor: "Auta de Souza",
      imagem: "./viagem.png",
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat."
    },
    {
      statement: "Viagem ao céu",
      autor: "Monteiro Lobato",
      imagem: "./viagem.png",
      descricao:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales felis nec lacinia dapibus. Praesent tempus turpis ipsum, sit amet iaculis nisi tempor sed. Donec sit amet justo eu dolor varius consequat sit amet non felis. Cras luctus convallis blandit. Donec eget iaculis ipsum. Phasellus ligula neque, convallis in dictum ac, cursus non neque. Integer sit amet convallis turpis, in fringilla tortor. Curabitur interdum neque sed volutpat vestibulum. Aliquam erat volutpat. Nulla sit amet pulvinar orci, at pellentesque dolor. Proin fringilla id felis sed egestas. Aliquam molestie sit amet orci ac consequat."
    }
  ];
  current = 0;

  next() {
    if (this.current < this.livros.length - 1) {
      this.current++;
    }
  }
}
