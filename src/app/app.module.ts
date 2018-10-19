import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TabelaComponent } from './card/tabela/tabela.component';

import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { NovoProcessoComponent } from './novo-processo/novo-processo.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

@NgModule({
  declarations: [
    AppComponent,
    TabelaComponent,
    CardComponent,
    NovoProcessoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
