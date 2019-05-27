import { Controller, Get } from 'routing-controllers';

@Controller()
export default class IndexController {
  @Get('/health')
  public health() {
    return { status: 'OK' };
  }
}
