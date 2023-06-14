import RecipeModel from 'src/app/components/recipes/recipe.model';
import { IngredientModel } from 'src/app/shared/ingredient.model';

export default class RecipesService {
  private recipes: RecipeModel[] = [
    new RecipeModel(
      1,
      'Carbonara_uno',
      'Spaghetti alla carbonara',
      'https://blog.giallozafferano.it/paola67/wp-content/uploads/2020/04/Spaghetti-alla-carbonara-720x480.jpg',
      [
        new IngredientModel('pancetta', 10),
        new IngredientModel('egg', 10)
      ]
    ),
    new RecipeModel(
      2,
      'Carbonara_due',
      'Spaghetti alla carbonara',
      'https://blog.giallozafferano.it/paola67/wp-content/uploads/2020/04/Spaghetti-alla-carbonara-720x480.jpg',
      [
        new IngredientModel('guanciale', 10),
        new IngredientModel('pepe', 10)
      ]
    ),
  ];

  getRecipes() {
    return JSON.parse(JSON.stringify(this.recipes));
  }

  getRecipesByID(id: number) {
    return this.recipes.find(r => r.id === id);
  }
}
