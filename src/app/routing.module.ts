import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from './cards/card.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'relatorio',
    component: RelatorioComponent
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class RoutingModule { }
