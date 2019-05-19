export interface IRead<T> {
  find(query: object): Promise<T[]>;
  findOne(id: string): Promise<T>;
}
