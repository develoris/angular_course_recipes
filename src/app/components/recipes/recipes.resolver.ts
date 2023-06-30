import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import RecipeModel from './recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolver implements Resolve<RecipeModel[]> {
  constructor(private dataStorageService: DataStorageService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.dataStorageService.fetchRecipes();
  }
}
