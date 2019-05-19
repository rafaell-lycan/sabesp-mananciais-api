import { Dam } from './Dam';

export class Dams {
  public readonly date: string;
  public dams: Dam[] = [];

  constructor(date: string) {
    this.date = date;
  }

  public add(dam: Dam) {
    this.dams.push(dam);
  }
}
