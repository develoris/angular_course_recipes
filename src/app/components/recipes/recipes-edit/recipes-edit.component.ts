import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.sass']
})
export class RecipesEditComponent implements OnInit {
  editMode!: boolean;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(this.setEditMode)
  }
  setEditMode(params: Params) {
    this.editMode = params['ID'] != null;
  }
}
