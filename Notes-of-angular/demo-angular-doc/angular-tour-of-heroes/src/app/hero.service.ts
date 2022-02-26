import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero.interface';
import { HEROES } from './heroes/mock-heroes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor() { }

  public getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    return heroes;
  }
}
