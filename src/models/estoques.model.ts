/* eslint-disable @typescript-eslint/naming-convention */
import {Entity, model, property} from '@loopback/repository';

@model()
export class Estoques extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  id_produto: number;

  @property({
    type: 'date',
  })
  data_vencimento?: string;

  @property({
    type: 'number',
    required: true,
  })
  quantidade: number;

  constructor(data?: Partial<Estoques>) {
    super(data);
  }
}

export interface EstoquesRelations {
  // describe navigational properties here
}

export type EstoquesWithRelations = Estoques & EstoquesRelations;
