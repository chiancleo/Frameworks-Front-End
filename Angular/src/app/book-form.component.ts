import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'

interface LivroType {
  statement: string
  autor: string
  descricao: string
  imagem: string
}

@Component({
  selector: 'book-form',
  template: `
    <form #bookForm="ngForm" (ngSubmit)="bookForm.form.valid && onSubmit()">
      <book-input
        type="input"
        label="Título"
        placeholder="Digite o título do livro"
        isRequired="true"
        name="statement"
        [(value)]="book.statement"
      ></book-input>
      <book-input
        type="input"
        label="Autor"
        placeholder="Digite o nome do Autor"
        isRequired="true"
        [(value)]="book.autor"
      ></book-input>
      <book-input
        type="textarea"
        label="descricao"
        placeholder="Digite uma breve descricao"
        isRequired="true"
        [(value)]="book.descricao"
      ></book-input>
      <book-input
        type="textarea"
        label="Link"
        placeholder="Digite o link para download"
        isRequired="true"
        [(value)]="book.imagem"
      ></book-input>
      <input type="submit" value="Cadastrar" />
      <button type="button" (click)="cancel.emit()">Cancelar</button>
    </form>
  `
})
export class LivroFormComponent implements OnInit {
  @Input() livro: LivroType
  @Output() update = new EventEmitter()
  @Output() cancel = new EventEmitter()
  book

  ngOnInit() {
    const { statement, autor, descricao, imagem } = this.livro || {}
    this.book = {
      statement,
      autor,
      descricao,
      imagem
    }
  }

  onSubmit() {
    this.update.emit({
      statement: this.book.statement,
      autor:this.book.autor,
      descricao:this.book.descricao,
      imagem:this.book.imagem
    })
  }
}
