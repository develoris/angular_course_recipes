import { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import RecipeModel from 'src/app/components/recipes/recipe.model';
import RecipesService from '../recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  template: `<div class="row">
      <div class="col-xs-12">
        <button class="btn btn-success" routerLink="/recipes/new">
          New Recipe
        </button>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-xs-12 list-group">
        <app-recipe-item
          *ngFor="let recipe of recipes; let i = index"
          [recipeItem]="recipe"
          [index]="i"
        ></app-recipe-item>
      </div>
    </div> `,
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[] = [];
  recipesSubscription!: Subscription;
  // recipeObs$
  constructor(private recipesService: RecipesService) {}
  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.recipesSubscription = this.recipesService.changeRecipes.subscribe(
      (recipes) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipesService.getRecipes();
  }
}
