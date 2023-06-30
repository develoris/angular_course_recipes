import { Component, OnInit } from '@angular/core';
import RecipeModel from 'src/app/components/recipes/recipe.model';
import RecipesService from '../recipes.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import ShoppingListService from '../../shopping-list/shoppingList.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass'],
})
export class RecipeDetailComponent implements OnInit {
  id!: number;
  recipe!: RecipeModel;
  constructor(private recipesService: RecipesService, private router: Router, private activatedRoute: ActivatedRoute, private ingredientsService: ShoppingListService) {

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: Data) => {
      this.id = +data['ID'];
      this.recipe = <RecipeModel>this.recipesService.getRecipe(this.id);
    })
  }
  addIngredient() {
    this.ingredientsService.addIngredients(this.recipe.ingredients)
  }
  
  onDeleteRecipe() {
    const conf = confirm('Are you sure?')
    if (conf) {
      this.recipesService.deleteRecipe(this.id)
      this.router.navigate(['../'], { relativeTo: this.activatedRoute })
    }
  }
}
