import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

export const routes: Routes = [
  {
    path: 'relatorio',
    component: RelatorioComponent
  },
  { path: '**', component: CardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
