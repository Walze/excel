import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TabelaComponent } from './card/tabela/tabela.component';

import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { FormsModule } from '@angular/forms';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { NovoProcessoComponent } from './card/novo-processo/novo-processo.component';
import { RoutingModule } from './routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TabelaComponent,
    HomeComponent,
    CardComponent,
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
