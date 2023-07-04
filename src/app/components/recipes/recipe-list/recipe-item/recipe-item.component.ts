import { Component, Input } from '@angular/core';
import RecipeModel from 'src/app/components/recipes/recipe.model';

@Component({
  selector: 'app-recipe-item',
  template: `<a
    [routerLink]="[index]"
    class="list-group-item d-flex justify-content-between align-items-start clearfix cursor-pointer"
  >
    <div class="ms-2 me-auto fs-6">
      <div class="fw-bold fs-5">{{ recipeItem.name }}</div>
      {{ recipeItem.description }}
    </div>
    <img
      src="{{ recipeItem.imageUrl }}"
      [alt]="recipeItem.name"
      class="img-responsive"
      style="max-height: 50px"
    />
  </a>`,
})
export class RecipeItemComponent {
  @Input() recipeItem!: RecipeModel;
  @Input() index!: number;
}
