import { Controller, Get } from 'routing-controllers';

@Controller()
export default class IndexController {
  @Get('/health')
  public health() {
    return { status: 'OK' };
  }

  // Loader.io only
  @Get('/loaderio-deb75e3581d893735fd6e5050757bdb2')
  public loaderio() {
    return true;
  }
}
