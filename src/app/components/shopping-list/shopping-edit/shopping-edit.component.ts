import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { IngredientModel } from 'src/app/shared/ingredient.model';
import ShoppingListService from '../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.sass'],
})
export class ShoppingEditComponent  {
  @ViewChild('inputName', { static: true }) inputNameRef!: ElementRef;
  @ViewChild('inputAmount', { static: true }) inputAmountRef!: ElementRef;
  constructor(private shoppingListService: ShoppingListService) { }


  onAddIngredient() {
    const ingName = this.inputNameRef.nativeElement.value;
    const ingAmount = this.inputAmountRef.nativeElement.value;
    console.log('new ingredient')
    this.shoppingListService.addIngredient(new IngredientModel(ingName, ingAmount))
  }
}
