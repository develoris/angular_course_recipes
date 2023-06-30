import { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import RecipeModel from 'src/app/components/recipes/recipe.model';
import RecipesService from '../recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[] = [];
  recipesSubscription!: Subscription;
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
