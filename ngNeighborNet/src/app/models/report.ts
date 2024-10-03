import { Address } from "./address";
import { Reportcategory } from "./reportcategory";
import { Severity } from "./severity";
import { User } from "./user";
import { Comment } from "./comment";

export class Report {

  id: number;
  name: string;
  description: string;
  createDate: string;
  modifiedDate: string;
  imageUrl: string;
  eventDate: string;
  eventDateEnd: string;
  resolved: boolean;
  enabled: boolean;
  address: Address;
  user: User;
  reportCategory: Reportcategory;
  severity: Severity;
  comments: Comment [];

constructor(
  id: number=0,
  name: string='',
  description: string='',
  createDate: string='',
  modifiedDate: string='',
  imageUrl: string='',
  eventDate: string='',
  eventDateEnd: string='',
  resolved: boolean=false,
  enabled: boolean=false,
  address: Address = new Address(),
  user: User = new User(),
  reportCategory = new Reportcategory(),
  severity = new Severity(),
  comments = [],


){
  this.id=id;
  this.name=name;
  this.description=description;
  this.createDate=createDate;
  this.modifiedDate=modifiedDate;
  this.imageUrl=imageUrl;
  this.eventDate=eventDate;
  this.eventDateEnd=eventDateEnd;
  this.resolved=resolved;
  this.enabled=enabled;
  this.address=address;
  this.user=user;
  this.reportCategory=reportCategory;
  this.severity=severity;
  this.comments=comments;

}

}
