export class Severity {
  id: number;
  name: string;
  level: number;
  imageUrl: string;

  constructor(
    id: number=0,
    name: string='',
    level: number=0,
    imageUrl: string='',
  ){
    this.id=id;
    this.name=name;
    this.level=level;
    this.imageUrl=imageUrl;
  }
}
