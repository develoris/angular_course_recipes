import { Component, OnInit } from '@angular/core';
import RecipeModel from 'src/app/components/recipes/recipe.model';
import RecipesService from '../recipes.service';
import { ActivatedRoute, Data } from '@angular/router';
import ShoppingListService from '../../shopping-list/shoppingList.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass'],
})
export class RecipeDetailComponent implements OnInit {
   recipe!: RecipeModel;
  constructor(private recipesService: RecipesService, private activatedRoute: ActivatedRoute, private ingredientsService: ShoppingListService){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data:Data) =>{
      this.recipe = <RecipeModel>this.recipesService.getRecipesByID(+data['ID']);
    })
  }
  addIngredient(){
    this.ingredientsService.addIngredients(this.recipe.ingredients)
  }
}
