import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Seller } from '../../information/interfaces/table.interface';
import { InformationTableService } from '../../information/information-table.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shared-menu-bar',
  templateUrl: './menu-bar.component.html',
  styles: ``,
})
export class MenuBarComponent implements OnInit {
  public items!: MenuItem[];
  public popup: boolean = false;
  public sellers!: Seller[];
  public totalRegs: any;

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onShow: EventEmitter<boolean> = new EventEmitter();

  private sellersSubscription!: Subscription;

  constructor(private getInf: InformationTableService) {}

  ngOnInit() {
    this.sellersSubscription = this.getInf.sellers$.subscribe(
      (sellers: Seller[]) => {
        this.sellers = sellers;
        this.totalRegs = this.getInf.getTotalRegs( );
      }
    );
  }

  public SendToParent(query: string): void {
    this.onValue.emit(query);
  }

  public showPopup(): void {
    this.onShow.emit();
  }
}
