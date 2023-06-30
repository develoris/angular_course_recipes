import { Component, Input } from '@angular/core';
import RecipeModel from 'src/app/components/recipes/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.sass'],
})
export class RecipeItemComponent {
  @Input() recipeItem!: RecipeModel;
  @Input() index!: number;
  constructor() {}
}
