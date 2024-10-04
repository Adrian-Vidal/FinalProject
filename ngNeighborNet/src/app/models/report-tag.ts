export class ReportTag {

  id: number;
  tagName: string;

  constructor(
    id: number,
    tagName: string = ''
  ){
    this.id = id;
    this.tagName = tagName;
  }

}
