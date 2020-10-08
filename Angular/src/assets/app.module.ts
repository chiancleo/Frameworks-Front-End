import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LivroComponent } from "./livro.component";
import { BibliotecaComponent } from "./biblioteca.component";

@NgModule({
  declarations: [AppComponent, LivroComponent, BibliotecaComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
