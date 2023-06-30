import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import RecipesService from '../recipes.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.sass'],
})
export class RecipesEditComponent implements OnInit {
  id!: number;
  editMode!: boolean;
  recipeForm!: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService
  ) {}
  get ingretientsControl() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(this.setEditMode.bind(this));
  }
  setEditMode(params: Params) {
    this.id = +params['ID'];
    this.editMode = params['ID'] != null;
    this.initForm();
  }

  initForm() {
    let recipeName = '';
    let recipeimageUrl = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray<FormGroup>([], this.atLeastOne);
    const { required, pattern } = Validators;
    if (this.editMode) {
      const recipe = this.recipesService.getRecipe (this.id);
      recipeName = !recipe ? '' : recipe.name;
      recipeimageUrl = !recipe ? '' : recipe.imageUrl;
      recipeDescription = !recipe ? '' : recipe.description;
      if (recipe?.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, [required]),
              amount: new FormControl(ingredient.amount, [
                required,
                pattern('^[1-9][0-9]*$'),
              ]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [required]),
      imageUrl: new FormControl(recipeimageUrl, [required]),
      description: new FormControl(recipeDescription, [required]),
      ingredients: recipeIngredients,
    });
  }

  atLeastOne(control: AbstractControl): ValidationErrors | null {
    const valid = (control as FormArray).controls.length > 0;
    return valid ? null : { atLeastOneError: true };
  }
  onSubmit() {
    if(this.editMode){
      this.recipesService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipesService.addRecipe(this.recipeForm.value)
    }
    this.onCancelRecipes();
  }
  onAddIngretiend() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        amount: new FormControl('', [
          Validators.required,
          Validators.pattern('^[1-9][0-9]*$'),
        ]),
      })
    );
  }
  removeIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  getErrorForm(item: string, errorType: string): boolean {
    const abstractControl = <AbstractControl>this.recipeForm.get(item);
    return abstractControl.touched && abstractControl.hasError(errorType);
  }
  getErrorFormIngredients(
    index: number,
    item: string,
    errorType: string
  ): boolean {
    const abstractControl = (<FormArray>this.recipeForm.get('ingredients'))
      .at(index)
      .get(item) as AbstractControl;
    return abstractControl.touched && abstractControl.hasError(errorType);
  }

  onDeleteRecipe(){
    const conf = confirm('Are you sure?')
    if(conf){
      this.recipesService.deleteRecipe(this.id)
      this.router.navigate(['../'], {relativeTo: this.activatedRoute})
    }
  }

  onCancelRecipes(){
    if( this.editMode && this.recipeForm.touched && !confirm('Are you sure?')){
      return;
    }
      this.recipeForm.reset();
      this.router.navigate(['/recipes'])
  }
}
