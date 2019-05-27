import { Controller, Get, Param } from 'routing-controllers';
import { validateDate, formatDate } from '../common/utils/dateUtils';
import { SabespResponse } from '../services/Sabesp';
import Sabesp from '../services/Sabesp';
import Mapper from '../services/Mapper';

@Controller('/v2')
export default class ApiV2Controller {
  public async getData(date: string) {
    const data: SabespResponse = await Sabesp.info(date);
    return Mapper.v2(data);
  }

  @Get('/')
  public get() {
    const date = formatDate(new Date());
    return this.getData(date);
  }

  @Get('/:date')
  public getByDate(@Param('date') date: string) {
    if (validateDate(date)) {
      return this.getData(date);
    }

    throw new Error(`The date format ${date} must follow YYYY-MM-DD and cannot be future.`);
  }
}
