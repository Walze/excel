import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TabelaComponent } from './cards/tabela/tabela.component';
import { CardsComponent } from './cards/card.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { NovoProcessoComponent } from './novo-processo/novo-processo.component';
import { RoutingModule } from './routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TabelaComponent,
    HomeComponent,
    CardsComponent,
    NovoProcessoComponent,
    RelatorioComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
