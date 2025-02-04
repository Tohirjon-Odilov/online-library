import { CustomButtonComponent } from './components/custom-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverDirective } from './directives/hover.directive';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { GoBackComponent } from './components/go-back/go-back.component';
import {RandomImagePipe} from "./pipes/random-image.pipe";

@NgModule({
  declarations: [
    CustomButtonComponent,
    HoverDirective,
    FormatDatePipe,
    GoBackComponent,
    RandomImagePipe
  ],
  imports: [CommonModule],
  exports: [
    CustomButtonComponent,
    GoBackComponent,
    HoverDirective,
    FormatDatePipe,
    CommonModule,
    RandomImagePipe
  ]
})
export class SharedModule { }
