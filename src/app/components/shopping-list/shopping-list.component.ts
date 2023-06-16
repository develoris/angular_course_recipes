import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngredientModel } from './../../shared/ingredient.model';
import ShoppingListService from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: IngredientModel[] = [];
  changeIngredientEvenSubscription!: Subscription;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngretients();
    this.changeIngredientEvenSubscription =
      this.shoppingListService.changeIngredientsEvent.subscribe((ingredients: IngredientModel[]) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {
    this.changeIngredientEvenSubscription.unsubscribe();
  }
}
