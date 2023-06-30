import { Subject } from 'rxjs';
import { IngredientModel } from 'src/app/shared/ingredient.model';

export default class ShoppingListService {
  private ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('pineApple', 5),
    new IngredientModel('bred', 6),
  ];
  changeIngredientsEvent = new Subject<IngredientModel[]>();
  startUpdateIngredient = new Subject<number>();
  getIngretients(): IngredientModel[] {
    return JSON.parse(JSON.stringify(this.ingredients));
  }

  getIngredient(index: number): IngredientModel {
    return { ...this.ingredients[index] };
  }
  addIngredient(newIngredient: IngredientModel) {
    this.ingredients.push(newIngredient);
    this.changeIngredientsEvent.next(this.getIngretients());
  }
  addIngredients(newIngredients: IngredientModel[]) {
    this.ingredients.push(...newIngredients);
    this.changeIngredientsEvent.next(this.getIngretients());
  }
  updateIngredient(index: number, ingredient: IngredientModel) {
    this.ingredients[index] = ingredient;
    this.changeIngredientsEvent.next(this.getIngretients());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.changeIngredientsEvent.next(this.getIngretients());
  }
}
