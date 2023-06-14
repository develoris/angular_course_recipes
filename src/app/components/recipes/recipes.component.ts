import { Component, OnInit } from '@angular/core';
import RecipeModel from 'src/app/components/recipes/recipe.model';
import RecipesService from './recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.sass'],
  providers: [RecipesService],
})
export class RecipesComponent implements OnInit {
  constructor() {}

  ngOnInit() {

  }
}
