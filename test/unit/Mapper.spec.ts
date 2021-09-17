import { mapV1, mapV2 } from '../../src/utils/mapper';
import { SabespDam, SabespResponse } from '../../src/services/sabesp';

describe('Services: Mapper', () => {
  const systems: Array<Partial<SabespDam>> = [
    {
      Nome: 'Cantareira',
      VolumePorcentagemAR: '100',
      VolumeVariacaoStr: '1',
      PrecDia: '1',
      PrecMensal: '30',
      PrecHist: '1',
    },
  ];

  const response = {
    ReturnObj: {
      sistemas: systems,
    },
  } as SabespResponse;

  it('should return the V1 format', () => {
    const result = mapV1(response);
    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual({
      name: 'Cantareira',
      data: [
        {
          key: 'volume armazenado',
          value: '100 %',
        },
        {
          key: 'pluviometria do dia',
          value: '1 mm',
        },
        {
          key: 'pluviometria acumulada no mês',
          value: '30 mm',
        },
        {
          key: 'média histórica do mês',
          value: '1 mm',
        },
      ],
    });
  });

  it('should return the V2 format', () => {
    const result = mapV2(response);
    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual({
      name: 'Cantareira',
      data: {
        volume_armazenado: '100 %',
        pluviometria_do_dia: '1 mm',
        pluviometria_acumulada_no_mes: '30 mm',
        media_historica_do_mes: '1 mm',
      },
    });
  });
});
