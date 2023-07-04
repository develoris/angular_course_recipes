import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholderDirective/placeholder.directive';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [LoadingSpinnerComponent, PlaceholderDirective, AlertComponent],
  imports:[CommonModule],
  exports: [LoadingSpinnerComponent, PlaceholderDirective, AlertComponent, CommonModule],
})
export default class SharedModule {}
