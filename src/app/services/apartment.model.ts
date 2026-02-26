export interface Apartment {
  id:string,
  apartmentName: string, 
  customerName: string, 
  isSharedProperty: boolean 
  streetAddress: string, 
  city:string 
  areaSqFt: Number, 
  rent: Number, 
  stayType: string 
  priceMode:string, 
  isFurnished:boolean 
  title: string, 
  description: string,
  favorite:boolean,
  featured:boolean,
  amenities:[]
}