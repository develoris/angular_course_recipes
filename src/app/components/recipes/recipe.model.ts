import { InvokeFunctionExpr } from "@angular/compiler";
import { IngredientModel } from "src/app/shared/ingredient.model";

export default class RecipeModel {
  public id: number;
  public name: string;
  public description: string;
  public imageUrl: string;
  ingredients: IngredientModel[]

  constructor(id: number, name: string, description: string, imageUrl: string, ingredients: IngredientModel[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
  }

}
