import { inject } from '@angular/core';
import {
  ResolveFn,
} from '@angular/router';
import RecipeModel from './recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

export const RecipesResolver: ResolveFn<RecipeModel[]> =
    () => {
      return inject(DataStorageService).fetchRecipes();
    };
