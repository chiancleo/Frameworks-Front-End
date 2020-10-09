import { Component, Input } from "@angular/core";

@Component({
  selector: "livro",
  template: `<div class="classeLivro">
    <h1>{{ statement }}</h1>
    <h2>{{ autor }}</h2>
    <h4>{{ header }}</h4>
    <p class="paragrafo">{{ descricao }}</p>
  </div>`
})
export class LivroComponent {
  @Input() statement: string;
  @Input() autor: string;
  header = "Descrição";
  @Input() descricao: string;
  //@Input() imagem: imagem
}
