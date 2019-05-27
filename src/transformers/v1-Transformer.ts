import { Dam } from './../entities/Dam';

export default class V1Transformer {
  public static transform(dams: Dam[]) {
    return dams.map((dam: Dam) => {
      return {
        name: dam.name,
        data: [
          {
            key: 'volume armazenado',
            value: `${dam.volume} %`,
          },
          {
            key: 'pluviometria do dia',
            value: `${dam.pluviometry.day} mm`,
          },
          {
            key: 'pluviometria acumulada no mês',
            value: `${dam.pluviometry.month} mm`,
          },
          {
            key: 'média histórica do mês',
            value: `${dam.pluviometry.average} mm`,
          },
        ],
      };
    });
  }
}
