import { Component, Input, OnInit } from '@angular/core';
import { Hero } from './hero.interface';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  public windstorm: Hero = {
    id: 1,
    name: 'Windstorm'
  }

  public isChecked = false;

  public heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  public getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  public onSelect(hero: Hero) {
    this.windstorm = hero;
  }

  public onClick() {
    console.log(this.isChecked)
  }
}
