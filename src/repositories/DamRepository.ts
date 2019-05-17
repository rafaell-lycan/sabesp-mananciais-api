import { Dam } from '../entities/Dam';
import { BaseRepository } from './base/BaseRepository';

// now, we have all code implementation from BaseRepository
export class DamRepository extends BaseRepository<Dam> {
  // here, we can create all especific stuffs of Dam Repository
  public countOfDams(): Promise<number> {
    return this.collection.count({});
  }
}
