export interface Seller {
  ID: number;
  name: string;
  TotalSells: number;
  TotalPrice: number;
  products?: Sells[];
}

export interface Sells {
  id: number;
  name: string;
  units: number;
  price: number;
  description: string;
}

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
