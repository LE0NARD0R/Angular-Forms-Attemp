import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    AutoCompleteModule,
    ButtonModule,
    ConfirmPopupModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    MenubarModule,
    TableModule,
  ]
})
export class PrimeNgModule { }
