import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sells, Seller } from '../../information/interfaces/table.interface';
import { InformationTableService } from '../../information/information-table.service';

@Component({
  selector: 'shared-popup-add',
  templateUrl: './popup-add.component.html',
  styleUrl: './popup-add.component.css'
})
export class PopupAddComponent implements OnInit{

  public myForm: FormGroup = this.fb.group({
    id: [ null , [Validators.required, Validators.minLength(3), Validators.pattern("^[0-9]*$") ], ],
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    products: this.fb.array([this.productForm()])
  });

  @Output()
  public onValue: EventEmitter<boolean> = new EventEmitter

  @Output()
  public onSubmitForm: EventEmitter<boolean> = new EventEmitter

  constructor( private fb: FormBuilder, private getInf: InformationTableService ){ }

  ngOnInit(): void {
    this.myForm
  }

  get products(): FormArray {
    return this.myForm.get('products') as FormArray;
  }

  addProduct(): void {
    this.products.push(this.productForm());
  }

  public productForm() {
    return this.fb.group({
      id_product: [0],
      name_product: [''],
      selled: [0],
      price: [0],
      description: ['']
    });
  }

  public closePopup():void {
    this.onValue.emit()
  }

  public submitForm():void {
    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched()
      return
    };
    const newSeller: Seller = this.getInf.organize((this.myForm.getRawValue()))
    this.getInf.refreshInfo( newSeller )
    this.onSubmitForm.emit()
  }

  
}
