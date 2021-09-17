import { SabespResponse } from '../services/sabesp'
import { Dam, DamName } from '../interfaces'
import { V1Transformer } from './transformers/v1-Transformer'
import { V2Transformer } from './transformers/v2-Transformer'

function mapToDamFormat(data: SabespResponse): Dam[] {
  return (data?.ReturnObj?.sistemas || []).map((item) => ({
    name: item.Nome as DamName,
    volume: item.VolumePorcentagemAR,
    variation: item.VolumeVariacaoStr,
    pluviometry: {
      day: item.PrecDia,
      month: item.PrecMensal,
      average: item.PrecHist,
    },
  }))
}

export function mapV1(data: SabespResponse) {
  return V1Transformer.transform(mapToDamFormat(data))
}

export function mapV2(data: SabespResponse) {
  return V2Transformer.transform(mapToDamFormat(data))
}
