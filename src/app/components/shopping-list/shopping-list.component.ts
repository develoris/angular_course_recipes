import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngredientModel } from './../../shared/ingredient.model';
import ShoppingListService from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  template: `<div class="row">
    <div class="col-xs-10 ps-0">
      <app-shopping-edit></app-shopping-edit>
      <hr />
      <ul class="list-group cursor-pointer">
        <li
          *ngFor="let ingredient of ingredients; let i = index"
          (click)="onStartUpdateIngredient(i)"
          class="list-group-item"
        >
          {{ ingredient.name }} ({{ ingredient.amount }})
        </li>
      </ul>
    </div>
  </div> `,
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: IngredientModel[] = [];
  changeIngredientEvenSubscription!: Subscription;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngretients();
    this.changeIngredientEvenSubscription =
      this.shoppingListService.changeIngredientsEvent.subscribe(
        (ingredients: IngredientModel[]) => {
          this.ingredients = ingredients;
        }
      );
  }
  onStartUpdateIngredient(index: number) {
    this.shoppingListService.startUpdateIngredient.next(index);
  }
  ngOnDestroy(): void {
    this.changeIngredientEvenSubscription.unsubscribe();
  }
}
