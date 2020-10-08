import { Component } from "@angular/core";

@Component({
  selector: "livro",
  template: `<h1>{{ statement }}</h1>`
})
export class LivroComponent {
  statement = "título do livro";
}
