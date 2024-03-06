import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalPageComponent } from './principal-page/principal-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PrincipalPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    PrincipalPageComponent,
  ]
})
export class PagesModule { }
