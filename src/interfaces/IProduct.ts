interface Location {
  zip_code: number;
  address: string;
  address_number: number;
  neighborhood: string;
  complement: string;
  city: string;
  state: string;
}
interface IStore {
  name: string;
  phone: string;
  location: Location;
}
export interface IProduct {
    ean: number;
    name: string;
    fullname: string;
    price: string;
    picture: string;
    store: IStore
  }
