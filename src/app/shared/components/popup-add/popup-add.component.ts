import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sells, Seller } from '../../information/interfaces/table.interface';
import { InformationTableService } from '../../information/information-table.service';

@Component({
  selector: 'shared-popup-add',
  templateUrl: './popup-add.component.html',
  styleUrl: './popup-add.component.scss',
})
export class PopupAddComponent implements OnInit {
  public myForm!: FormGroup;

  public addProductForm: boolean = false;

  @Output()
  public onValue: EventEmitter<boolean> = new EventEmitter();

  @Output()
  public onSubmitForm: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private getInf: InformationTableService
  ) {}

  ngOnInit(): void {
    this.myForm = this.getInf.createSellersForm();
  }

  get getFormControls() {
    return this.myForm.get('productsRow') as FormArray;
  }

  get productsRow(): FormArray {
    return this.myForm.get('productsRow') as FormArray;
  }

  public addProduct(): void {
    this.addProductForm = true;
    const control = this.myForm.get('productsRow') as FormArray;
    control.push(this.getInf.createProductsRowFormGroup());
  }

  public closePopup(): void {
    this.onValue.emit();
  }

  public submitForm(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const newSeller: Seller = this.getInf.organize(this.myForm.getRawValue());
    this.getInf.refreshInfo(newSeller);
    this.onSubmitForm.emit();
  }
}
