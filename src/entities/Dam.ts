/**
 * Dam names avaiable
 */
export enum DamName {
  cantareira = 'Cantareira',
  altoTiete = 'Alto Tietê',
  guarapiranga = 'Guarapiranga',
  cotia = 'Cotia',
  rioGrande = 'Rio Grande',
  rioClaro = 'Rio Claro',
  saoLourenco = 'São Lourenço',
}

/**
 * Pluviometry is a measure based on millimeters (mm)
 */
export interface Pluviometry {
  /**
   * Daily pluviometry
   */
  day: string | number;
  /**
   * Monthly pluviometry
   */
  month: string | number;
  /**
   * Monthly average pluviometry
   */
  average: string | number;
}

export interface Dam {
  name: DamName;
  volume: string;
  variation: string;
  pluviometry: Pluviometry;
}
