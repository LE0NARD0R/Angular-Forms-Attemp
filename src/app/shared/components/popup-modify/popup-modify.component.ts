import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformationTableService } from '../../information/information-table.service';
import { Seller } from '../../information/interfaces/table.interface';

@Component({
  selector: 'shared-popup-modify',
  templateUrl: './popup-modify.component.html',
  styleUrl: './../popup-add/popup-add.component.css'
})
export class PopupModifyComponent implements OnInit{

  @Input()
  public rowData: any

  @Output()
  public onTableOff: EventEmitter<boolean> = new EventEmitter

  public productForm!: FormGroup

  constructor( private fb: FormBuilder,
    private getInf : InformationTableService,
  ) {

  }

  ngOnInit(): void {
    this.productForm = this.fb.group( {
      id: [this.rowData.ID , [Validators.required, Validators.minLength(3) ] ],
      name: [this.rowData.name, [ Validators.required, Validators.minLength(3) ] ],
      tableRows: this.fb.array([], [Validators.required])
    } )
    if ( this.rowData.TotalSells > 0 ) {
      this.getInfoAndExportsRows(this.rowData)
    } else {
    this.addRow()
    }
  }

  createFormGroup(  ): FormGroup {
    return this.fb.group({
      id: [0,[Validators.required]],
      name: ['',[Validators.required, Validators.minLength(3)]],
      units:[0, [Validators.required]],
      price: [0, [Validators.required]],
      description: [''],
    });
  }

  get getFormControls() {
    const control = this.productForm.get('tableRows') as FormArray;
    return control;
  }

  public addRow():void {
    const control =  this.productForm.get('tableRows') as FormArray;
    control.push(this.createFormGroup());
  }

  public getInfoAndExportsRows( data:any ):void {
    let newRowForm
    const products = data.products
    const control =  this.productForm.get('tableRows') as FormArray;
    for ( let p of products ) {
      newRowForm = this.createFormGroupWithData( p )
      control.push(newRowForm)
    }
  }

  public createFormGroupWithData( p:any ): FormGroup {
    return this.fb.group({
      id: [p.id,[Validators.required]],
      name: [p.name,[Validators.required, Validators.minLength(3)]],
      units:[p.units, [Validators.required]],
      price: [p.price, [Validators.required]],
      description: [p.description],
    });
  }

  public tableOff(): void {
    this.onTableOff.emit( false )
  }

  public submitForm(): void {
    if ( this.productForm.invalid ){
      this.productForm.markAllAsTouched()
      return
    };
    const newSeller: Seller = this.getInf.organizeForModify((this.productForm.getRawValue()))
    this.getInf.updateInfo( newSeller )
    this.onTableOff.emit( false )
  }
}
