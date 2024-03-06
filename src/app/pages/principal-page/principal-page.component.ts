import { Component, OnInit } from '@angular/core';
import { InformationTableService } from '../../shared/information/information-table.service';
import { Seller } from '../../shared/information/interfaces/table.interface';

@Component({
  selector: 'principal-page',
  templateUrl: './principal-page.component.html',
  styles: ``,
})
export class PrincipalPageComponent implements OnInit {
  public popup: boolean = false;
  public popupModify: boolean = false

  public rowData: any = []

  public filteredSeller: Seller[] = [];

  public filterc: boolean = true;

  public sellers: Seller[] = [];

  constructor(private getInf: InformationTableService) {}

  ngOnInit(): void {
    this.sellers = [...this.getInf.sellers];
  }

  public filter(query: string): void {
    this.filteredSeller = this.getInf.filterSellers(query);
    this.filterc = false;
  }

  public shutDown(off: boolean): void {
    this.filterc = off;
  }

  public showPopup(): void {
    this.popup = !this.popup;
  }

  public submitForm(): void {
    this.popup = !this.popup;
    this.sellers = [...this.getInf.sellers];
  }

  public showModify( rowData:any ):void {
    if ( rowData ) {
      this.rowData = rowData
    } else {
    this.sellers = [...this.getInf.sellers];
    }
    this.popupModify = !this.popupModify;
  }
}
