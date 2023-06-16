import { Subject } from "rxjs";
import { IngredientModel } from "src/app/shared/ingredient.model";

export default class ShoppingListService {
  private ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('pineApple', 5),
    new IngredientModel('bred', 6),
  ];
   changeIngredientsEvent = new Subject<IngredientModel[]>();
  getIngretients(): IngredientModel[] {
    return JSON.parse(JSON.stringify(this.ingredients));
  }

  addIngredient(newIngredient: IngredientModel) {
    this.ingredients.push(newIngredient);
    this.changeIngredientsEvent.next(this.getIngretients());
  }
  addIngredients(newIngredients: IngredientModel[]) {
    this.ingredients.push(...newIngredients);
    this.changeIngredientsEvent.next(this.getIngretients());
  }
}
