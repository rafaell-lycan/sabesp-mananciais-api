import { SabespResponse, SabespDam } from './Sabesp';
import { Dam, DamName } from './../entities/Dam';
import V1Transformer from '../transformers/v1-Transformer';
import V2Transformer from '../transformers/v2-Transformer';
import logger from '../common/utils/logger';

export default class Mapper {
  public static mapToDam(data: SabespResponse): Dam[] {
    logger.debug(`Map to Dam: ${JSON.stringify(data || {})}`);
    const dirtyItems = data.ReturnObj.sistemas || [];

    return dirtyItems.map((item: SabespDam) => {
      return {
        name: item.Nome as DamName,
        volume: item.VolumePorcentagemAR,
        variation: item.VolumeVariacaoStr,
        pluviometry: {
          day: item.PrecDia,
          month: item.PrecMensal,
          average: item.PrecHist,
        },
      };
    });
  }

  public static v1(data: SabespResponse) {
    const dams: Dam[] = this.mapToDam(data);
    return V1Transformer.transform(dams);
  }

  public static v2(data: SabespResponse) {
    const dams: Dam[] = this.mapToDam(data);
    return V2Transformer.transform(dams);
  }
}
