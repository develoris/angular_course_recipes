import { Subject } from 'rxjs';
import RecipeModel from 'src/app/components/recipes/recipe.model';
import { IngredientModel } from 'src/app/shared/ingredient.model';

export default class RecipesService {
  changeRecipes = new Subject<RecipeModel[]>();
  private recipes: RecipeModel[] = [];

  getRecipes() {
    return JSON.parse(JSON.stringify(this.recipes));
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(newRecipe: RecipeModel) {
    this.recipes.push(newRecipe);
    this.changeRecipes.next(this.getRecipes());
  }
  setRecipes(recipes: RecipeModel[]) {
    this.recipes = [...recipes];
    this.changeRecipes.next(this.getRecipes());
  }
  updateRecipe(index: number, newRecipe: RecipeModel) {
    this.recipes[index] = { ...newRecipe };
    this.changeRecipes.next(this.getRecipes());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.changeRecipes.next(this.getRecipes());
  }
}
