import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LivroComponent } from "./livro.component";
import { BibliotecaComponent } from "./biblioteca.component";
import { LivroFormComponent } from './book-form.component'


@NgModule({
  declarations: [
    AppComponent, 
    LivroComponent, 
    BibliotecaComponent,
    LivroFormComponent 
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
