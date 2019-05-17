// importing mongoClient to connect at mongodb
import { MongoClient } from 'mongodb';

import { Dam } from './entities/Dam';
import { DamRepository } from './repositories/DamRepository';

(async () => {
  // connect at mongoClient
  const connection = await MongoClient.connect('mongodb://localhost');
  const db = connection.db('dams');

  // our operations
  // creating a dam
  const dam = new Dam('SP', 1020);

  // initializing the repository
  const repository = new DamRepository(db, 'damns');

  // call create method from generic repository
  const result: boolean = await repository.create(dam);
  // console.log(`dam inserted with ${result ? 'success' : 'fail'}`);

  // call specific method from dam class
  const count: number = await repository.countOfDams();
  // console.log(`the count of dams is ${count}`);

  /**
   * dam inserted with success
   * the count of dams is 1
   */
})();
