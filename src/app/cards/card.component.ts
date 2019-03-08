import { Component, Input } from '@angular/core';
import { ICard } from '../models/IResponse';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() public card: Readonly<ICard>;

}
