import { Dam } from '../../interfaces';

export class V2Transformer {
  public static transform(dams: Dam[]) {
    return dams.map((dam: Dam) => {
      return {
        name: dam.name,
        data: {
          volume_armazenado: `${dam.volume} %`,
          pluviometria_do_dia: `${dam.pluviometry.day} mm`,
          pluviometria_acumulada_no_mes: `${dam.pluviometry.month} mm`,
          media_historica_do_mes: `${dam.pluviometry.average} mm`,
        },
      };
    });
  }
}
