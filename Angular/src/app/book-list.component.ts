import { Component } from '@angular/core'
import { LivroService } from './book-list.service'

@Component({
  selector: 'book-list',
  template: `
    <div *ngIf="mode === 'view'">    
      <p *ngFor="let livro of bookService.livros; index as i">
        <b>Título: </b> {{ livro.statement }}
        <b>Autor: </b> {{ livro.autor }}
        <br />
        <b>Link: </b><a href="livro.imagem">{{livro.imagem}}</a>
      </p>
      <button (click)="addLivro()">Cadastrar Novo</button>
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
export class LivroListComponent {
  mode = 'view'
  current = null

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
}
