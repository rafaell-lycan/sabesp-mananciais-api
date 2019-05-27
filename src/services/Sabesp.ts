import fetch, { Response } from 'node-fetch';
import logger from '../common/utils/logger';

const SABESP_API_URI: string = 'http://mananciais.sabesp.com.br/api/Mananciais/ResumoSistemas';

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
    Data: '2019-05-25T00:00:00';
    DataString: '25/05/2019';
    sistemas: SabespDam[];
    total: {};
    cardSistema: string;
    infoGrafico: {};
  };
}

class Sabesp {
  public async info(date: string): Promise<SabespResponse> {
    logger.debug(`Sabesp Service:: Getting info for ${date}`);
    const response: Response = await fetch(`${SABESP_API_URI}/${date}`);
    logger.debug(`Sabesp Service:: Fetched with status ${response.status}`);
    return response.json();
  }
}

export default new Sabesp();
