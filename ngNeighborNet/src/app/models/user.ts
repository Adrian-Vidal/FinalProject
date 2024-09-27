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
  // addressL Address;  //Probably should implmeent later

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
  }


}
