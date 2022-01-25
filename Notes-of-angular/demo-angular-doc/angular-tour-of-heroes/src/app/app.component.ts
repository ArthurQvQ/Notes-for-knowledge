import { Component } from '@angular/core';
import { Hero } from './heroes/hero.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Arthur\'s test of Hero';
}
