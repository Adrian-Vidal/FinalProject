import { Address } from "./address";

export class User {
  //------------------------------FIELDS--------------------------------
  id: number;
  email: string;
  username: string;
  password: string;
  enabled: boolean;
  role: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  address: Address;


  // addressL Address;  //Probably should implmeent later
  // address: Address | null;

  constructor(
    id: number=0,
    email: string='',
    username: string='',
    password: string='',
    enabled: boolean=false,
    role: string='',
    firstName: string='',
    lastName: string='',
    imageUrl: string='',

    address: Address = new Address()


    // address: Address = new Address()
  ){
    this.id=id;
    this.email=email;
    this.username=username;
    this.password=password;
    this.enabled=enabled;
    this.role=role;
    this.firstName = firstName;
    this.lastName=lastName;
    this.imageUrl=imageUrl;
    this.address=address;

    // this.address = address;
  }


}
