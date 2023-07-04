import { Component, OnInit, ViewChild } from '@angular/core';
import { IngredientModel } from 'src/app/shared/ingredient.model';
import ShoppingListService from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f', { static: true }) ingredientForm!: NgForm;
  substription!: Subscription;
  editMode = false;
  editItemIndex!: number;
  editedItem!: IngredientModel | null;
  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit(): void {
    this.substription =
      this.shoppingListService.startUpdateIngredient.subscribe(
        (index: number) => {
          this.editMode = true;
          this.editItemIndex = index;
          this.editedItem = this.shoppingListService.getIngredient(
            this.editItemIndex
          );
          this.ingredientForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        }
      );
  }

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onReset();
  }
  onAddIngredient() {
    const { name: ingName, amount: ingAmount } = this.ingredientForm.value;
    const newIngredient = new IngredientModel(ingName, ingAmount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onReset();
  }

  onReset() {
    this.editMode = false;
    this.editItemIndex = -1;
    this.editedItem = null;
    this.ingredientForm.reset();
  }
}
