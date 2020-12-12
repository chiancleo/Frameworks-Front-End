import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'

interface LivroType {
  statement: string
  autor: string
  descricao: string
  imagem: string
}

@Component({
  selector: 'livro-form',
  template: `
    <form #livroForm="ngForm" (ngSubmit)="livroForm.form.valid && onSubmit()">
      <livro-input
        type="input"
        label="Título"
        placeholder="Digite o título do livro"
        isRequired="true"
        name="statement"
        [(value)]="book.statement"
      ></livro-input>
      <livro-input
        type="input"
        label="Autor"
        placeholder="Digite o nome do autor"
        isRequired="true"
        name="autor"
        [(value)]="book.autor"
      ></livro-input>
      <livro-input
        type="textarea"
        label="Descrição"
        placeholder="Digite uma breve descrição da obra"
        name="descricao"
        [(value)]="book.descricao"
      ></livro-input>
      <livro-input
        type="textarea"
        label="Link"
        placeholder="Digite o link para download"
        isRequired="true"
        name="imagem"
        [(value)]="book.imagem"
      ></livro-input>
      <input class="submitBtn" type="submit" value="Cadastrar" />
      <button class="submitBtn" type="button" (click)="cancel.emit()">Cancelar</button>
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
      autor: this.book.autor,
      descricao: this.book.descricao,
      imagem: this.book.imagem
    })
  }
}

