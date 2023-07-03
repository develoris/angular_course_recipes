import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeItemComponent } from './components/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { HeaderComponent } from './header/header.component';

import { AppComponent } from './app.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { AppRoutingModule } from './app.routing.module';
import ShoppingListService from './components/shopping-list/shoppingList.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesEditComponent } from './components/recipes/recipes-edit/recipes-edit.component';
import RecipesService from './components/recipes/recipes.service';
import { AuthComponent } from './components/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import AuthInterceptor from './components/auth/auth.interceptor';
import { PlaceholderDirective } from './shared/placeholderDirective/placeholder.directive';
// import { Routes } from '@angular/router';

// const appRouter: Routes
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    ShoppingEditComponent,
    ShoppingListComponent,
    DropdownDirective,
    RecipesEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ShoppingListService,
    RecipesService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
