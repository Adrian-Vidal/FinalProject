import { User } from "./user";
import { Report } from "./report";

export class Comment {

  id: number;
  body: string;
  createDate: string;
  modifiedDate: string;
  imageUrl: string;
  enabled: boolean;
  report: Report | undefined;
  user: User | undefined;


  constructor(
    id: number = 0,
    body: string = '',
    createDate: string = '',
    modifiedDate: string = '',
    imageUrl: string = '',
    enabled: boolean = false,
    report: Report = new Report(),
    user: User = new User()

  ){
    this.id = id;
    this.body = body;
    this.createDate = createDate;
    this.modifiedDate = modifiedDate;
    this.imageUrl = imageUrl;
    this.enabled = enabled;
    this.report = report;
    this.user = user;
  }
}
