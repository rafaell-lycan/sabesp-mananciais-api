import { Router } from 'express'
import { formatDate, validateDate } from '../../../utils/dates';
import { getDamnsInformation } from '../../../services/sabesp';
import { mapV1 } from '../../../utils/mapper';
import { logger } from '../../../utils/logger';

const routesV1 = Router()

async function getMappedDataByDate(date: string){
  const data = await getDamnsInformation(date);

  return mapV1(data)
}

routesV1.get('/', async (_req, res) => {
  const today = formatDate(new Date())
  const data = await getMappedDataByDate(today);

  res.json(data);
})

routesV1.get('/:date', async (req, res, next) => {
  const { date } = req.params;

  try {
    if(date && validateDate(date)) {
      const data = await getMappedDataByDate(date);

      res.json(data);
    }
  } catch (err) {
    logger.error(err);
    // throw new InternalServerError(err.message);
    next(err)
  }
})

export { routesV1 }
