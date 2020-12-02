import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { LivroComponent } from "./livro.component";
import { BibliotecaComponent } from "./biblioteca.component";

import { LivroFormComponent } from './book-form.component';
import { LivroListComponent } from './book-list.component';
import { InputComponent } from './input.component';


@NgModule({
  declarations: [
    AppComponent, 
    LivroComponent, 
    BibliotecaComponent,
    LivroFormComponent,
    LivroListComponent,
    InputComponent 
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
