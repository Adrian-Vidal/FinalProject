export class Address {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: number;
  country: string;
  enabled: boolean;

  constructor(
    id: number=0,
    name: string='',
    street: string='',
    city: string='',
    state: string='',
    postalCode: number = 0,
    country: string='',
    enabled: boolean=false
  )
{
  this.id=id;
  this.name=name;
  this.street=street;
  this.city=city;
  this.state=state;
  this.postalCode=postalCode;
  this.country=country;
  this.enabled=enabled;
}
}


