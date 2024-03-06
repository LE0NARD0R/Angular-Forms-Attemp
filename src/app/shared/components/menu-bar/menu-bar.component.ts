import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'shared-menu-bar',
  templateUrl: './menu-bar.component.html',
  styles: ``,
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[] | undefined;

  public popup: boolean = false

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter

  @Output()
  public onShow: EventEmitter<boolean> = new EventEmitter

  ngOnInit() {
    this.items = [
      {
        label: 'Vendedores',
        icon: 'pi pi-fw pi-user',
        items: [],
      },
      {
        label: 'Añadir',
        icon: 'pi pi-fw pi-user-plus',
        items: [],
        command: () => this.showPopup()
      },
    ];
  }



  public next( query:string ):void {
    this.onValue.emit( query )
  }

  public showPopup( ):void {
    this.onShow.emit(  )
  }
}
