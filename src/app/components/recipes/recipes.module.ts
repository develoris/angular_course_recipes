import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesComponent } from './recipes.component';
import RecipesRoutingModule from './recipes.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import SharedModule from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipesEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule { }
