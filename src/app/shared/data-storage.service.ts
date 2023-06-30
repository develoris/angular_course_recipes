import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import RecipesService from '../components/recipes/recipes.service';
import RecipeModel from '../components/recipes/recipe.model';
import { catchError, exhaustMap, map, of, pipe, take, tap } from 'rxjs';
import { AuthService } from '../components/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private firebaseUrl =
    'https://ng-course-recipe-book-a78f0-default-rtdb.europe-west1.firebasedatabase.app/';
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put<RecipeModel[]>(`${this.firebaseUrl}recipes.json`, recipes)
      .subscribe();
  }
  fetchRecipes() {
    return this.http
      .get<RecipeModel[]>(`${this.firebaseUrl}recipes.json`)
      .pipe(this.pipeForFetchRecipes());
  }

  pipeForFetchRecipes() {
    return pipe(
      map((recipes: RecipeModel[]) =>
        recipes.map((recipe) => ({
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        }))
      ),
      tap((recipes) => {
        this.recipesService.setRecipes(recipes);
      })
    );
  }
}
