import { Injectable } from '@angular/core';
import { Seller } from './interfaces/table.interface';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete/autocomplete.interface';

@Injectable({
  providedIn: 'root',
})
export class InformationTableService {
  private _sellers: Seller[] = [
    {
      ID: 1273,
      name: 'Sarah',
      TotalSells: 56,
      TotalPrice: 6720,
      products: [
        {
          id: 2345,
          name: 'televisor',
          units: 10,
          price: 120,
          description: 'lorem ipsum',
        },
        {
          id: 2346,
          name: 'Xbox',
          units: 10,
          price: 120,
          description: 'lorem ipsum',
        },
        {
          id: 2347,
          name: 'PS5',
          units: 12,
          price: 120,
          description: 'lorem ipsum',
        },
        {
          id: 2348,
          name: 'Apple Vision',
          units: 10,
          price: 120,
          description: 'lorem ipsum',
        },
        {
          id: 2349,
          name: 'Iphone',
          units: 14,
          price: 120,
          description: 'lorem ipsum',
        },
      ],
    },
    {
      ID: 1233,
      name: 'Armando',
      TotalSells: 60,
      TotalPrice: 19000,
      products: [
        {
          id: 5678,
          name: 'Laptop',
          units: 5,
          price: 800,
          description: 'Powerful laptop with high performance specifications.',
        },
        {
          id: 7890,
          name: 'Smartphone',
          units: 20,
          price: 600,
          description: 'Feature-rich smartphone with a stunning display.',
        },
        {
          id: 2468,
          name: 'Wireless Headphones',
          units: 25,
          price: 100,
          description: 'High-quality wireless headphones for music lovers.',
        },
        {
          id: 1357,
          name: 'Fitness Tracker',
          units: 10,
          price: 50,
          description:
            'Advanced fitness tracker to monitor your health and activities.',
        },
      ],
    },
    {
      ID: 1213,
      name: 'Fernando',
      TotalSells: 18,
      TotalPrice: 5500,
      products: [
        {
          id: 5678,
          name: 'Laptop',
          units: 2,
          price: 800,
          description: 'Powerful laptop with high performance specifications.',
        },
        {
          id: 7890,
          name: 'Smartphone',
          units: 5,
          price: 600,
          description: 'Feature-rich smartphone with a stunning display.',
        },
        {
          id: 2468,
          name: 'Wireless Headphones',
          units: 7,
          price: 100,
          description: 'High-quality wireless headphones for music lovers.',
        },
        {
          id: 1357,
          name: 'Fitness Tracker',
          units: 4,
          price: 50,
          description:
            'Advanced fitness tracker to monitor your health and activities.',
        },
      ],
    },
    {
      ID: 1235,
      name: 'Juan',
      TotalSells: 120,
      TotalPrice: 30000,
      products: [
        {
          id: 5678,
          name: 'Laptop',
          units: 15,
          price: 800,
          description: 'Powerful laptop with high performance specifications.',
        },
        {
          id: 7890,
          name: 'Smartphone',
          units: 20,
          price: 600,
          description: 'Feature-rich smartphone with a stunning display.',
        },
        {
          id: 2468,
          name: 'Wireless Headphones',
          units: 35,
          price: 100,
          description: 'High-quality wireless headphones for music lovers.',
        },
        {
          id: 1357,
          name: 'Fitness Tracker',
          units: 50,
          price: 50,
          description:
            'Advanced fitness tracker to monitor your health and activities.',
        },
      ],
    },
    {
      ID: 1123,
      name: 'Franco',
      TotalSells: 95,
      TotalPrice: 32000,
      products: [
        {
          id: 5678,
          name: 'Laptop',
          units: 20,
          price: 800,
          description: 'Powerful laptop with high performance specifications.',
        },
        {
          id: 7890,
          name: 'Smartphone',
          units: 20,
          price: 600,
          description: 'Feature-rich smartphone with a stunning display.',
        },
        {
          id: 2468,
          name: 'Wireless Headphones',
          units: 25,
          price: 100,
          description: 'High-quality wireless headphones for music lovers.',
        },
        {
          id: 1357,
          name: 'Fitness Tracker',
          units: 30,
          price: 50,
          description:
            'Advanced fitness tracker to monitor your health and activities.',
        },
      ],
    },
    {
      ID: 1623,
      name: 'Oscar',
      TotalSells: 0,
      TotalPrice: 0,
    },
  ];

  constructor(  ) {
    this.loadLocalStorage()
  }

  get sellers(): Seller[] {
    return [...this._sellers];
  }

  public filterSellers(query: any, name: boolean = false): any {
    let filtered: any[] = [];

    for (let i = 0; i < (this.sellers as any[]).length; i++) {
      let seller = (this.sellers as any[])[i];
      if (isNaN(query)) {
        if (seller.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        if ( name ) filtered.push(seller.name);
        else {filtered.push(seller)};
        }
      } else {
        if (seller.ID.toString().startsWith(query)) {
          if ( name ) filtered.push(seller.ID);
          else {filtered.push(seller)};
        }
      }
    }

    return filtered;
  }

  public organize( rawForm:any ):Seller {

    let selled = 0;
    let totalPrice = 0;

    for (const product of rawForm.products) {
      const idProduct = product.id_product;
      if (idProduct) {
        selled += product.selled || 0;
        totalPrice += (product.price || 0) * (product.selled || 0);
      }
    }

    return {
      ID: rawForm.id,
      name: rawForm.name,
      TotalSells: selled,
      TotalPrice: totalPrice,
    };

  }

  public refreshInfo( newSeller: Seller ): void{
    this._sellers.push( newSeller )
    this.savedLocalStorage()
  }

  public organizeInfForEditTable(data: Seller):Seller {
    let info: Seller = {
      ID: 0,
      name: '',
      TotalSells: 0,
      TotalPrice: 0,
      products: []
    }

    info.ID = data.ID
    info.name = data.name
    info.TotalSells = data.TotalSells
    info.TotalPrice = data.TotalPrice
    info.products = data.products

    return info
  }

  public organizeForModify( rawForm:any ):Seller {

    let selled = 0;
    let totalPrice = 0;
    for (const product of rawForm.tableRows ) {
      const idProduct = product.id;
      if (idProduct) {
        selled += product.units || 0;
        totalPrice += (product.price || 0) * (product.units || 0);
      }
    }

    return {
      ID: rawForm.id,
      name: rawForm.name,
      TotalSells: selled,
      TotalPrice: totalPrice,
      products: rawForm.tableRows
    };

  }

  public updateInfo( newSeller: Seller ): void{
    for ( let i = 0; i < this._sellers.length; i++ ){
      if( this._sellers[i].ID === newSeller.ID ) {
        this._sellers[i].TotalPrice = newSeller.TotalPrice
        this._sellers[i].TotalSells = newSeller.TotalSells
        this._sellers[i].products = newSeller.products
      }
    }
    this.savedLocalStorage()
  }

  private savedLocalStorage():void {
    localStorage.setItem('sellers', JSON.stringify( this._sellers ))
  }

  private loadLocalStorage():void {
    if ( !localStorage.getItem('sellers') ) return
    this._sellers = JSON.parse( localStorage.getItem('sellers')! )
  }

}
