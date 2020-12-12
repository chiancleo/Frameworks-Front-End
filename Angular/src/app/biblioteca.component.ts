import { Component } from "@angular/core";
import { LivroService } from './book-list.service'

@Component({
  selector: "biblioteca",
  template: `
  <div *ngIf="mode === 'view'"> 
    <div>
    <livro
      [statement]="bookService.livros[current].statement"
      [autor]="bookService.livros[current].autor"
      [descricao]="bookService.livros[current].descricao"
      [imagem]="bookService.livros[current].imagem"
    >
    </livro>
    <button class="submitBtn" (click)="prev()">Anterior</button>
    <button class="submitBtn" (click)="next()">Próximo</button>    
    </div>   
    <button class="addBtn" (click)="addLivro()">Cadastrar Novo</button>
  </div>
  <div *ngIf="mode !== 'view'">
    <livro-form
      [livro]="bookService.livros[current]"
      (update)="updateChanges($event)"
      (cancel)="cancelChanges($event)"
    ></livro-form>
  </div>
`

})
export class BibliotecaComponent {
  mode = 'view'
  current = 0;

  constructor(public bookService: LivroService) {}

  addLivro() {
    this.mode = 'add'
    this.bookService.createLivro()
    this.current = this.bookService.livros.length - 1
  }


  removeLivro(index) {
    this.bookService.deleteLivro(index)
  }

  updateChanges(livro) {
    this.bookService.updateLivro(livro, this.current)
    this.mode = 'view'
  }

  cancelChanges() {
    if (this.mode === 'add') {
      this.bookService.deleteLivro(this.bookService.livros.length - 1)
    }
    this.mode = 'view'
  }

  next() {
    if (this.current < this.bookService.livros.length - 1) {
      this.current++;
    } else {
      this.current = 0;
    }
  }
  prev() {
    if (this.current !== 0) {
      this.current--;
    } else {
      this.current = this.bookService.livros.length - 1;
    }
  }
}
