import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';
import ShoppingListRoutingModule from './shopping-list.routing.module';
import SharedModule from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ShoppingEditComponent, ShoppingListComponent],
  imports: [FormsModule, ShoppingListRoutingModule, SharedModule]
})
export class ShoppingListModule {}
