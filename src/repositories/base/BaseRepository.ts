import { Collection, Cursor, Db } from 'mongodb';

import { IRead } from '../interfaces/IRead';
import { IWrite } from '../interfaces/IWrite';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public readonly collection: Collection;

  constructor(db: Db, collectionName: string) {
    this.collection = db.collection(collectionName);
  }

  public async create(item: T): Promise<boolean> {
    const { result } = await this.collection.insert(item);
    return !!result.ok;
  }

  public async update(id: string, item: T): Promise<boolean> {
    const { result } = await this.collection.updateOne({ _id: id }, item);
    return !!result.ok;
  }

  public async delete(id: string): Promise<boolean> {
    const { result } = await this.collection.deleteOne({ _id: id });
    return !!result.ok;
  }

  public async find(query: object = {}): Promise<T[]> {
    const items: Cursor<T> = await this.collection.find<T>(query);
    return items.toArray();
  }

  public async findOne(id: string): Promise<T> {
    const item = await this.collection.findOne({ _id: id });
    return item;
  }
}
