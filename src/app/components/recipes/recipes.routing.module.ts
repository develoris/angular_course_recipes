import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateRoute } from '../auth/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipesComponent } from './recipes.component';
import { RecipesResolver } from './recipes.resolver';
const routes: Routes = [
  {
    path: '',
    canActivate: [canActivateRoute],
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
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class RecipesRoutingModule {}
