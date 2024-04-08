import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformationTableService } from '../../information/information-table.service';
import { Seller } from '../../information/interfaces/table.interface';

@Component({
  selector: 'shared-popup-modify',
  templateUrl: './popup-modify.component.html',
  styleUrl: './../popup-add/popup-add.component.scss',
})
export class PopupModifyComponent implements OnInit {
  @Input()
  public rowData: any;

  @Output()
  public onTableOff: EventEmitter<boolean> = new EventEmitter();

  public productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private getInf: InformationTableService
  ) {}

  ngOnInit(): void {
    this.productForm = this.getInf.createSellersForm(this.rowData);
    if (this.rowData.TotalSells > 0) {
      this.getInfoAndExportsRows(this.rowData);
    } else {
      this.addRow();
    }
  }

  get getFormControls() {
    return this.productForm.get('productsRow') as FormArray;
  }

  public addRow(): void {
    const control = this.productForm.get('productsRow') as FormArray;
    control.push(this.getInf.createProductsRowFormGroup());
  }

  public getInfoAndExportsRows(data: any): void {
    let newRowForm;
    const control = this.productForm.get('productsRow') as FormArray;
    for (let p of data.productsRow) {
      newRowForm = this.getInf.createProductsRowFormGroup(p);
      control.push(newRowForm);
    }
  }

  public tableOff(): void {
    this.onTableOff.emit(false);
  }

  public submitForm(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const newSeller: Seller = this.getInf.organize(this.productForm.getRawValue() );
    this.getInf.updateInfo(newSeller);
    this.onTableOff.emit(false);
  }

}
