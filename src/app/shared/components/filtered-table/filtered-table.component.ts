import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Seller } from '../../information/interfaces/table.interface';

@Component({
  selector: 'shared-filtered-table',
  templateUrl: './filtered-table.component.html',
  styles: ``
})
export class FilteredTableComponent implements OnInit{

  @Output()
  public onValue: EventEmitter<boolean> = new EventEmitter

  @Output()
  public onTable: EventEmitter<boolean> = new EventEmitter

  @Input()
  public newSellers!: Seller[]

  public cols: any

  ngOnInit() {

    this.cols = [
      { field: 'ID', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'TotalSells', header: 'Total Ventas' },
      { field: 'TotalPrice', header: 'Total Precios' }
    ];
  }

  public shutDownTable():void {
    this.onValue.emit( true )
  }

  showPopup( rowData:any ):void {
    this.onTable.emit(rowData)
  }

}
