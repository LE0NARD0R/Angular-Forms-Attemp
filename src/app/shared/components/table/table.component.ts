import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { InformationTableService } from '../../information/information-table.service';
import { Seller } from '../../information/interfaces/table.interface';
import { Subscription, map, tap } from 'rxjs';

@Component({
  selector: 'shared-table',
  templateUrl: './table.component.html',
  styles: ``,
})
export class TableComponent implements OnInit {

  @Output()
  public onTable: EventEmitter<any> = new EventEmitter();

  public sellers:Seller[] = [];

  public cols: any;

  private sellersSubscription!: Subscription;

  constructor(private getInf: InformationTableService) {}

  ngOnInit() {
    this.cols = [
      { field: 'ID', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'TotalSells', header: 'Total Ventas' },
      { field: 'TotalPrice', header: 'Total Precios' },
    ];

    this.sellersSubscription = this.getInf.sellers$.subscribe((sellers: Seller[]) => {
      this.sellers = sellers;
    });
  }



  showPopup(rowData: any): void {
    this.onTable.emit(rowData);
  }


}
