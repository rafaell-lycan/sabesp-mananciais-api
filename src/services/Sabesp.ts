import got from 'got';
import {logger} from '../utils/logger';

const API_BASE_URL = 'http://mananciais.sabesp.com.br/api/Mananciais/ResumoSistemas';

export interface SabespDam {
  SistemaId: string;
  Nome: string;
  VolumePorcentagemAR: string;
  VolumePorcentagem: number;
  VolumeVariacaoStr: string;
  VolumeVariacaoNum: number;
  VolumeOperacional: number;
  ImagePrecDia: string;
  PrecDia: string;
  PrecMensal: string;
  PrecHist: string;
  LinkGrafico: any;
  LinkInformacoes: any;
  IndicadorVolumeDia: number;
  IndicadorVolume: number;
  CircleImage: any;
  LinkTempo: any;
}

export interface SabespResponse {
  FlagHasError: boolean;
  Message: string;
  ReturnObj: {
    Data: string;
    DataString: string;
    sistemas: SabespDam[];
    total: {};
    cardSistema: string;
    infoGrafico: {};
  };
}

export async function getDamnsInformation(date: string): Promise<SabespResponse> {
  try {
    const { body } = await got(`${API_BASE_URL}/${date}`,
      { https: { rejectUnauthorized: false }}
    );

    return JSON.parse(body) as SabespResponse;
  } catch (err) {
    logger.error(err);
    throw err;
  }

}
