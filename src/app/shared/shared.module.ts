import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { TableComponent } from './components/table/table.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilteredTableComponent } from './components/filtered-table/filtered-table.component';
import { PopupAddComponent } from './components/popup-add/popup-add.component';
import { PopupModifyComponent } from './components/popup-modify/popup-modify.component';



@NgModule({
  declarations: [
    MenuBarComponent,
    TableComponent,
    SearchBoxComponent,
    FilteredTableComponent,
    PopupAddComponent,
    PopupModifyComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ],
  exports: [
    MenuBarComponent,
    TableComponent,
    SearchBoxComponent,
    FilteredTableComponent,
    PopupAddComponent,
    PopupModifyComponent,
  ]
})
export class SharedModule { }
