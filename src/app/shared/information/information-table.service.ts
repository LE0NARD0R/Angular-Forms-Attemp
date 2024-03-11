import { AutoCompleteCompleteEvent } from 'primeng/autocomplete/autocomplete.interface';
import { BehaviorSubject, Subject, debounceTime, map, tap } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Seller } from './interfaces/table.interface';

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
      productsRow: [
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
      productsRow: [
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
      productsRow: [
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
      productsRow: [
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
      productsRow: [
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

  public sellerSubject$ = new BehaviorSubject(this._sellers)

  public alert: boolean = false

  constructor(private fb: FormBuilder) {
    this.loadLocalStorage();
  }

  get sellers$() {
    return this.sellerSubject$.asObservable()
  }

  get sellers(): Seller[] {
    return this.sellerSubject$.value
  }

  public filterSellers(query: any, name: boolean = false): Seller[] {
    let filtered: Seller[] = [];
    for (let i = 0; i < (this.sellers as any[]).length; i++) {
      let seller = (this.sellerSubject$.value as any[])[i];
      if (isNaN(query)) {
        if (seller.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          if (name) filtered.push(seller.name);
          else {
            filtered.push(seller);
          }
        }
      } else {
        if (seller.ID.toString().startsWith(query)) {
          if (name) filtered.push(seller.ID);
          else {
            filtered.push(seller);
          }
        }
      }
    }

    return filtered;
  }

  public getTotalRegs( ):any {
    let vendedores = this.sellerSubject$.value
    const len = vendedores.length
    let totalSells = 0
    for ( let seller of vendedores ) {
      totalSells += seller.TotalPrice
    }

    return [len, totalSells]
  }

  public createSellersForm(data?: any): FormGroup {
    if (data) {
      return this.fb.group({
        id: [
          data.ID,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('^[0-9]*$'),
          ],
        ],
        name: [data.name, [Validators.required, Validators.minLength(3)]],
        productsRow: this.fb.array([]),
      });
    } else {
      return this.fb.group({
        id: [
          0,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('^[0-9]*$'),
          ],
        ],
        name: ['', [Validators.required, Validators.minLength(3)]],
        productsRow: this.fb.array([]),
      });
    }
  }

  public createProductsRowFormGroup(data?: any): FormGroup {
    if (data) {
      return this.fb.group({
        id: [
          data.id,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('^[0-9]*$'),
          ],
        ],
        name: [data.name, [Validators.required, Validators.minLength(3)]],
        units: [data.units, [Validators.required]],
        price: [data.price, [Validators.required]],
        description: [data.description],
      });
    } else {
      return this.fb.group({
        id: [
          0,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('^[0-9]*$'),
          ],
        ],
        name: ['', [Validators.required, Validators.minLength(3)]],
        units: [0, [Validators.required]],
        price: [0, [Validators.required]],
        description: [''],
      });
    }
  }

  public organize(rawForm: any): Seller {
    let units: number = 0;
    let totalPrice:number = 0;

    for (const product of rawForm.productsRow) {
      if (product.id) {
        units += +product.units || 0;
        totalPrice += (+product.price || 0) * (+product.units || 0);
      }
    }

    return {
      ID: rawForm.id,
      name: rawForm.name,
      TotalSells: units,
      TotalPrice: totalPrice,
      productsRow: rawForm.productsRow,
    };
  }

  public refreshInfo(newSeller: Seller): void {
    const sellers:Seller[] = this.sellerSubject$.value
    this.sellerSubject$.pipe(
      debounceTime(3000),
      map( () => {
        for (let i = 0; i < this.sellers.length; i++){
          if ( sellers[i].ID === newSeller.ID) return
        }
        sellers.push( newSeller )
        this.sellerSubject$.next(sellers)
        this.savedLocalStorage();
        console.log('corrió')
      } ),
    ).subscribe()

  }

  public updateInfo(newSeller: Seller): void {
    const sellers = this.sellerSubject$.value
    let done: boolean = false
    this.sellerSubject$.pipe(
      debounceTime(3000),
      map(() => {
        if (done) return
        for (let i = 0; i < this.sellers.length; i++) {
          if ( sellers[i].ID === newSeller.ID) {
            sellers[i].TotalPrice = newSeller.TotalPrice;
            sellers[i].TotalSells = newSeller.TotalSells;
            sellers[i].productsRow = newSeller.productsRow;
            done = true
          }
        }
        this.sellerSubject$.next(sellers)
        this.savedLocalStorage();
      })
    ).subscribe()


  }

  private savedLocalStorage(): void {
    localStorage.setItem('sellers', JSON.stringify(this.sellerSubject$.value));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('sellers')) return;
    this.sellerSubject$.next(JSON.parse(localStorage.getItem('sellers')!))
  }

}
