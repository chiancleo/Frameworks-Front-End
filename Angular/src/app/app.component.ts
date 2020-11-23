import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <book-form></book-form>
  `
})
export class AppComponent {
  livro = {
    statement: '',
    autor: '',
    descricao:'',
    imagem:''
  }
}
