import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import RecipeModel from 'src/app/components/recipes/recipe.model';
import RecipesService from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass'],
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeModel[] = [];

  constructor(private recipesService: RecipesService) {}
  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
  }
}
