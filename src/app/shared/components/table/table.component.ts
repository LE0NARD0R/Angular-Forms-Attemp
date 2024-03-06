import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InformationTableService } from '../../information/information-table.service';
import { Seller } from '../../information/interfaces/table.interface';

@Component({
  selector: 'shared-table',
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent implements OnInit{

  @Input()
  public sellers: Seller[] = []

  @Output()
  public onTable: EventEmitter<any> = new EventEmitter

  public cols: any

  constructor( private getInf: InformationTableService ) {  }

  ngOnInit() {

    this.cols = [
      { field: 'ID', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'TotalSells', header: 'Total Ventas' },
      { field: 'TotalPrice', header: 'Total Precios' }
    ];
  }

  showPopup( rowData:any ):void {
    this.onTable.emit(rowData)
  }

  // TODO: una función que pueda cambiar alguna propiedad para que se muestre un popup con otra tabla que pueda modificar valores

}
