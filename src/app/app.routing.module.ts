import { RecipesResolver } from './components/recipes/recipes.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesStartComponent } from './components/recipes/recipes-start/recipes-start.component';
import { RecipesEditComponent } from './components/recipes/recipes-edit/recipes-edit.component';
import { AuthComponent } from './components/auth/auth.component';
import { canActivateRoute } from './components/auth/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {path:'auth',  component: AuthComponent},
  {
    path: 'recipes',
    canActivate:[canActivateRoute],
    component: RecipesComponent,
    resolve: [RecipesResolver],
    children: [
      { path: '', component: RecipesStartComponent },
      { path: 'new', component: RecipesEditComponent },
      {
        path: ':ID',
        component: RecipeDetailComponent,
      },
      {
        path: ':ID/edit',
        component: RecipesEditComponent,
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
